'use client'
import React, { useEffect, useState }from 'react';

export default function TypingPage() {
    interface Sample {
      public_name: string;
      FASTA_URL: string;
  }  
  const [samples, setSamples] = useState<Sample[]>([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [samplesheet, setSamplesheet] = useState<{ url: string }>({ url: '' });    
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch('/practice_typing_file_details.json')
        .then(response => response.json())
        .then(data => {
            console.log('File details:', data);
            setSamples(data.samples);
            setSpeciesList(data.answer_sheet.species); 
            setSamplesheet(data.sample_sheet);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching the file details:', error);
            setLoading(false);
        });
}, []);

  return (
    <div className="flex flex-col items-center max-w-[800px] mx-auto">
        <h1>
          Genotyping puzzle
        </h1>
        <p>
                    Welcome to this genome puzzle, a challenge designed to test your bioinformatics skills. This is an excellent 
                    opportunity to demonstrate your expertise in genotyping.
                </p>
        {loading ? (
                <div><p>The today&apos;s genome puzzle is loading...</p></div>
            ) : (
            <div>
                <h1>Practice exercise</h1>
                <p>
                    You are provided with {samples.length} genome samples belonging to the species <em>{speciesList.join(', ')}</em>. 
                    Your task is to:
                </p>
                <ul className="list-disc list-inside">
                    <li>Genotype these assemblies using the appropriate tool</li>
                    <li>Extract the required information from the output</li>
                    <li>Format and submit a completed sample sheet.</li>
                </ul>

                <h2>Sample Sheet</h2>
                <p>
                    To help you organize and submit your results, a sample sheet has been provided.
                </p>
                <p>
                    Please download it using the link: <a href={samplesheet.url}>Download the sample sheet here</a>.
                </p>

                <h2>Table of Samples</h2>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left px-4 py-2">Sample Name</th>
                            <th className="text-left px-4 py-2">FASTA URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((sample, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-4 py-2">{sample.public_name}</td>
                                <td className="px-4 py-2"><a href={sample.FASTA_URL} target="_blank" rel="noopener noreferrer">{sample.FASTA_URL.split('/').pop()}</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2>Download Samples</h2>
                <p>You can download the samples in one go on the command line using something like curl or wget. Here are some example script to help:</p>
                <ul className="list-disc list-inside">
                    <li><a href='/practice_typing-wget-download_samples.txt'>Example script using wget</a></li>
                    <li><a href='/practice_typing-curl-download_samples.txt'>Example script using curl</a></li>
                </ul>

            </div>
            )}
      </div>
  );

};


