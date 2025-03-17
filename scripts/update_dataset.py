import os
import json
import boto3
from botocore.client import Config
import argparse
from dotenv import load_dotenv
import logging
import csv
import random
import string
from datetime import datetime
from dateutil.relativedelta import relativedelta
import hashlib

# Set up logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
def md5(file_path):
    hash_md5 = hashlib.md5()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def create_download_script(file_details):
    script_content = "#!/bin/bash\n\n"
    for sample in file_details['samples']:
        script_content += f"curl -O {sample['R1_URL']}\n"
        script_content += f"curl -O {sample['R2_URL']}\n"
    script_content += f"curl -O {file_details['sample_sheet']['url']}\n"
    script_path = "public/curl-download_samples.txt"
    with open(script_path, "w", encoding="utf-8") as script_file:
        script_file.write(script_content)
    os.chmod(script_path, 0o755)
    logging.info("Download script created at %s", script_path)

    # Generate WGET script content
    wget_script_content = "#!/bin/bash\n\n"
    for sample in file_details['samples']:
        wget_script_content += f"wget {sample['R1_URL']}\n"
        wget_script_content += f"wget {sample['R2_URL']}\n"
    wget_script_content += f"wget {file_details['sample_sheet']['url']}\n"
    
    wget_script_path = "public/wget-download_samples.txt"
    # Write WGET script
    with open(wget_script_path, "w", encoding="utf-8") as wget_script_file:
        wget_script_file.write(wget_script_content)
    os.chmod(wget_script_path, 0o755)
    logging.info("WGET download script created at %s", wget_script_path)



def fasta_create_download_script(type, file_details):
    script_content = "#!/bin/bash\n\n"
    for sample in file_details['samples']:
        script_content += f"curl -O {sample['FASTA_URL']}\n"
    script_content += f"curl -O {file_details['sample_sheet']['url']}\n"
    script_path = f"public/{type}-curl-download_samples.txt"
    with open(script_path, "w", encoding="utf-8") as script_file:
        script_file.write(script_content)
    os.chmod(script_path, 0o755)
    logging.info("Download script created at %s", script_path)

    # Generate WGET script content
    wget_script_content = "#!/bin/bash\n\n"
    for sample in file_details['samples']:
        wget_script_content += f"wget {sample['FASTA_URL']}\n"
    wget_script_content += f"wget {file_details['sample_sheet']['url']}\n"
    
    wget_script_path = f"public/{type}-wget-download_samples.txt"
    # Write WGET script
    with open(wget_script_path, "w", encoding="utf-8") as wget_script_file:
        wget_script_file.write(wget_script_content)
    os.chmod(wget_script_path, 0o755)
    logging.info("WGET download script created at %s", wget_script_path)


def generate_random_string(length=8, random_seed=42):
    random.seed(random_seed)
    letters = string.ascii_lowercase + string.digits
    return "".join(random.choice(letters) for i in range(length))

def file_upload(s3, fastq, bucket_name, key, force):
    if force:
        s3.upload_file(fastq, bucket_name, key)
        logging.info("Successfully uploaded %s", key)
    else:
        try:
            # Check if file already exists
            s3.head_object(Bucket=bucket_name, Key=key)
            logging.info("File %s already exists in bucket, skipping...", key)
        except s3.exceptions.ClientError:
            # File doesn't exist, upload it
            s3.upload_file(fastq, bucket_name, key)
            logging.info("Successfully uploaded %s", key)    


def upload_fastq_to_r2(directory_path, dotenv, force, rapidpath, release_date, random_seed=42):
    # Load environment variables from .env file
    if not load_dotenv(dotenv):
        raise ValueError("Could not load environment variables from .env file.")

    # Read values from environment variables
    bucket_name = os.getenv("BUCKET_NAME")
    access_key_id = os.getenv("ACCESS_KEY_ID")
    secret_access_key = os.getenv("SECRET_ACCESS_KEY")
    endpoint_url = os.getenv("ENDPOINT_URL")
    public_url = os.getenv("PUBLIC_URL")

    # Check if environment variables are set
    if not all([bucket_name, access_key_id, secret_access_key, endpoint_url]):
        raise ValueError(
            "One or more environment variables are not set. Please check your .env file."
        )

    # find answer_sheet.csv
    answer_sheet = []
    answer_sheet_path = [
        os.path.join(directory_path, x)
        for x in os.listdir(directory_path)
        if x.endswith("answer_sheet.csv")
    ][0]
    sample_sheet_path = [
        os.path.join(directory_path, x)
        for x in os.listdir(directory_path)
        if x.endswith("sample_sheet.csv")
    ][0]
    with open(answer_sheet_path, mode="r", encoding="utf-8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        answer_sheet = [row for row in csv_reader]
        for x in answer_sheet:
            x["R1_URL"] = f"{public_url}/{x['r1']}"
            x["R2_URL"] = f"{public_url}/{x['r2']}"
            x["R1_PATH"] = os.path.join(directory_path, x["r1"])
            x["R2_PATH"] = os.path.join(directory_path, x["r2"])
    # Initialize S3 client for Cloudflare R2
    s3 = boto3.client(
        "s3",
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
        endpoint_url=endpoint_url,
        region_name="auto",
        config=Config(signature_version="s3v4"),
    )
    file_details = {'samples': []}
    # Walk through the directory and upload files
    for sample in answer_sheet:
        # Upload file to R2
        logging.info("Uploading %s to R2...", sample["public_name"])
        file_details['samples'].append({
            'public_name': sample['public_name'],
            'R1_URL': sample['R1_URL'],
            'R2_URL': sample['R2_URL']
        })
        for fastq in [sample["R1_PATH"], sample["R2_PATH"]]:
            key = os.path.basename(fastq)
            file_upload(s3, fastq, bucket_name, key, force)

    random_filename = (
        f"answer_sheet_{generate_random_string(random_seed=random_seed)}.csv"
    )
    # Read answer sheet and get out list of included species 
    species_list = list(set(row['SPECIES'] for row in answer_sheet))
    # Upload answer_sheet.csv with random filename
   # s3.upload_file(answer_sheet_path, bucket_name, random_filename)
    file_details['answer_sheet'] = { 'filename': random_filename, 'url': f'{public_url}/{random_filename}', 'species': species_list }
    # upload sample_sheet.csv
   # s3.upload_file(sample_sheet_path, bucket_name, "sample_sheet.csv")
    file_details['sample_sheet'] = { 'filename': 'sample_sheet.csv', 'url': f'{public_url}/sample_sheet.csv' }
    file_details['release_date'] = release_date
    # Write details to JSON file
    with open("public/file_details.json", "w", encoding="utf-8") as json_file:
        json.dump(file_details, json_file, indent=4)

    create_download_script(file_details)
    if rapidpath:
        # Upload rapid dataset
        for rapid_file in os.listdir(rapidpath):
            rapid_file_path = os.path.join(rapidpath, rapid_file)
            key = os.path.basename(rapid_file_path)
            file_upload(s3, fastq, bucket_name, key, force)
            
def upload_fasta_to_r2(dataset, directory_path, dotenv, force, release_date, random_seed=42):
    # Load environment variables from .env file
    if not load_dotenv(dotenv):
        raise ValueError("Could not load environment variables from .env file.")

    # Read values from environment variables
    bucket_name = os.getenv("BUCKET_NAME")
    access_key_id = os.getenv("ACCESS_KEY_ID")
    secret_access_key = os.getenv("SECRET_ACCESS_KEY")
    endpoint_url = os.getenv("ENDPOINT_URL")
    public_url = os.getenv("PUBLIC_URL")

    # find answer_sheet.csv
    answer_sheet = []
    answer_sheet_path = [
        os.path.join(directory_path, x)
        for x in os.listdir(directory_path)
        if x.endswith("answer_sheet.csv")
    ][0]
    sample_sheet_path = [
        os.path.join(directory_path, x)
        for x in os.listdir(directory_path)
        if x.endswith("sample_sheet.csv")
    ][0]
    # Initialize S3 client for Cloudflare R2
    s3 = boto3.client(
        "s3",
        aws_access_key_id=access_key_id,
        aws_secret_access_key=secret_access_key,
        endpoint_url=endpoint_url,
        region_name="auto",
        config=Config(signature_version="s3v4"),
    )
    file_details = {'samples': []}
    with open(answer_sheet_path, mode="r", encoding="utf-8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        answer_sheet = [row for row in csv_reader]
        for sample in answer_sheet:
            sample["FASTA_URL"] = f"{public_url}/{sample['fasta']}"
            # Upload file to R2
            logging.info("Uploading %s to R2...", sample["sample"])
            file_details['samples'].append({
                'public_name': sample['sample'],
                'FASTA_URL': sample['FASTA_URL'],
            })
            fasta_path = os.path.join(os.path.dirname(answer_sheet_path), sample["fasta"])
            file_upload(s3, fasta_path, bucket_name, sample["fasta"], force)

        random_filename = (
            f"{dataset}_answer_sheet_{generate_random_string(random_seed=random_seed)}.csv"
        )
    # Read answer sheet and get out list of included species 
    species_list = list(set(row['SPECIES'] for row in answer_sheet))    
    # Upload answer_sheet.csv with random filename
    s3.upload_file(answer_sheet_path, bucket_name, random_filename)
    file_details['answer_sheet'] = { 'filename': random_filename, 'url': f'{public_url}/{random_filename}', 'species': species_list }
    # upload sample_sheet.csv 
    # md5 the sample sheet

    sample_sheet_md5 = md5(sample_sheet_path)[0:6]
    logging.info("MD5 checksum of sample_sheet.csv: %s", sample_sheet_md5)
    samplesheet_name = f"{dataset}_sample_sheet_{sample_sheet_md5}.csv"
    s3.upload_file(sample_sheet_path, bucket_name, samplesheet_name)
    file_details['sample_sheet'] = { 'filename': 'sample_sheet.csv', 'url': f'{public_url}/{samplesheet_name}' }
    file_details['release_date'] = release_date
    # Write details to JSON file
    with open(f"public/{dataset}_file_details.json", "w", encoding="utf-8") as json_file:
        json.dump(file_details, json_file, indent=4)

    fasta_create_download_script(dataset, file_details)



def main(args):
    # upload typing path 
    now = datetime.now()
    practice_release_date = now.strftime("%Y-%m-%d %H:%M:%S")
    test_release_date = (now + relativedelta(months=1)).strftime("%Y-%m-%d %H:%M:%S")
    random_seed = 42
    upload_fasta_to_r2('practice_typing', args.typingpath, args.dotenv, args.force, practice_release_date, random_seed=random_seed)
    upload_fasta_to_r2('real_typing', args.realtypingpath, args.dotenv, args.force, test_release_date,random_seed=random_seed * 2)
    


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Upload files to Cloudflare R2.")
    parser.add_argument(
        "--typingpath",
        type=str,
        help="The directory path to upload files from.",
        default="../genomepuzzle/ghru_output_dataset/kleborate_test",
    )
    parser.add_argument(
        "--realtypingpath",
        type=str,
        help="The directory path to upload files from.",
        default="../genomepuzzle/ghru_output_dataset/real_kleborate_test",
    )    
    parser.add_argument(
        "--outbreakpath",
        type=str,
        help="The directory path to upload files from.",
        default="../genomepuzzle/ghru_output_dataset/outbreak_test",
    )
    parser.add_argument(
        "--assemblypath",
        type=str,
        help="The directory path to upload files from.",
        default="../genomepuzzle/ghru_output_dataset/assembly_test",
    )
    parser.add_argument(
        "--dotenv", type=str, help="dotenv file", default=".r3_config.env"
    )
    parser.add_argument("--random_seed", type=int, help="random seed", default=42)
    parser.add_argument("--verbose", action="store_true", help="verbose logging")
    parser.add_argument("--force", action="store_true", help="overwrite remote files")
    args = parser.parse_args()
    main(args)
