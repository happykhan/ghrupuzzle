import React from 'react';

interface Sample {
  public_name: string;
  R1_URL: string;
  R2_URL: string;
}


const OutbreakExercise: React.FC<{ samples: Sample[], speciesList: string[], samplesheet: { url: string }, outbreak_type: string}> = ({ samples, speciesList, samplesheet, outbreak_type }) => {
    return (
        <div>
            <h1>{outbreak_type === 'real_outbreak' ? 'Challenge exercise' : 'Practice exercise'}</h1>
            <p>
                You are provided with {samples.length} genome samples belonging to the species <em>{speciesList.join(', ')}</em>. 
                Your task is to:
            </p>
            <ul className="list-disc list-inside">
                <li>Use read mapping and variant calling tools.</li>
                <li>Create a phylogenetic tree, as a newick file.</li>
                <li>Create a <a href="https://microreact.org/" target="_blank" rel="noopener noreferrer">Microreact</a>, using the metadata in the sample sheet.</li>
                <li>Detemine which samples are in a potential outbreak cluster.</li>
                <li>Send your .microreact file, and csv of your results to {'nabil.alikhan'}{'@'}{'cgps.group'}.</li>
            </ul>
            <p>
                These are the columns you need to include in the sample sheet, most of which are already provided in the samplesheet:
            </p>
            <div className="my-4"></div>
            <OutbreakTable/>

            <h2>Sample Sheet</h2>
            <p>
              Here is the metadata for the samples in the outbreak dataset. You can download the sample sheet by clicking the button below.
            </p>
            <button className="button is-link is-light"><a href={samplesheet.url} download target="_blank" rel="noopener noreferrer">Download the sample sheet here</a></button>

            <h2>Table of Samples</h2>
            <table className="table is-striped is-bordered">
                <thead>
                  <tr>
                    <th>Sample Name</th>
                    <th>FASTQ R1 URL</th>
                    <th>FASTQ R2 URL</th>
                  </tr>
                </thead>
                <tbody>
                  {samples.map((sample, index) => (
                    <tr key={index}>
                      <td>{sample.public_name}</td>
                      <td><a href={sample.R1_URL} target="_blank" rel="noopener noreferrer">{sample.R1_URL.split('/').pop()}</a></td>
                      <td><a href={sample.R2_URL} target="_blank" rel="noopener noreferrer">{sample.R2_URL.split('/').pop()}</a></td>
                    </tr>
                  ))}
                </tbody>
            </table>
            <h2>Download Samples</h2>
            <p>You can download the samples in one go on the command line using something like curl or wget. Here are some example script to help:</p>
            <ul className="list-disc list-inside">
                <li><button className="button is-link is-light is-small"><a href={`/${outbreak_type}-wget-download_samples.txt`} download target="_blank" rel="noopener noreferrer">Example script using wget</a></button></li>
                <li><button className="button is-link is-light is-small"><a href={`/${outbreak_type}-curl-download_samples.txt`} download target="_blank" rel="noopener noreferrer">Example script using curl</a></button></li>
            </ul>
            </div>)};


export default OutbreakExercise;



function OutbreakTable() {
  const columns = [
    { name: "Column Name", description: "Description" },
    { name: "Sample", description: "Unique identifier or name for the sample being analyzed." },
    { name: "Cluster", description: "Grouping of related samples based on genetic similarity or epidemiological links. YOUR TASK." },
    { name: "Host", description: "The source organism or host from which the sample was collected (e.g., human, animal, environment)." },
    { name: "Location", description: "Geographic location where the sample was collected." },
    { name: "Collection Date", description: "The date on which the sample was obtained." },
    { name: "Phenotype", description: "Observable characteristics, including antimicrobial resistance (AMR) profile or other traits." },
    { name: "R1", description: "Path to the forward read file (R1) used for sequencing." },
    { name: "R2", description: "Path to the reverse read file (R2) used for sequencing." },
    { name: "Species", description: "The predicted or assigned species of the sample based on sequencing data." },
  ];
  
    return (
      <div>
        <table className="table is-striped is-bordered">
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {columns.slice(1).map((col, index) => (
              <tr key={index} className="border">
                <td>{col.name}</td>
                <td>{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  