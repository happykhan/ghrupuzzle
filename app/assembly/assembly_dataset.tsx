import React from 'react';

interface Sample {
  public_name: string;
  R1_URL: string;
  R2_URL: string;
}

const AssemblyExercise: React.FC<{ samples: Sample[], speciesList: string[], samplesheet: { url: string }, assembly_type: string}> = ({ samples, speciesList, samplesheet, assembly_type }) => {
    return (
        <div>
            <h1>{assembly_type === 'real_assembly' ? 'Challenge exercise' : 'Practice exercise'}</h1>
            <p>
                You are provided with {samples.length} genome samples belonging to the species <em>{speciesList.join(', ')}</em>. 
                Your task is to:
            </p>
            <ul className="list-disc list-inside">
                <li>Genotype these assemblies using the appropriate tool</li>
                <li>Extract the required information from the output</li>
                <li>Format a completed sample sheet.</li>
                <li>Send your completed sample sheet (csv) to {'nabil.alikhan'}{'@'}{'cgps.group'}</li>
            </ul>

            These are the columns you need to fill in the sample sheet:
                <div className="my-4">
                <GenomeAssemblyQC/>
                </div>
            <br/>

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
                        <th className="text-left px-4 py-2">FASTQ R1 URL</th>
                        <th className="text-left px-4 py-2">FASTQ R2 URL</th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((sample, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2">{sample.public_name}</td>
                            <td className="px-4 py-2"><a href={sample.R1_URL} target="_blank" rel="noopener noreferrer">{sample.R1_URL.split('/').pop()}</a></td>
                            <td className="px-4 py-2"><a href={sample.R2_URL} target="_blank" rel="noopener noreferrer">{sample.R2_URL.split('/').pop()}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Download Samples</h2>
            <p>You can download the samples in one go on the command line using something like curl or wget. Here are some example script to help:</p>
            <ul className="list-disc list-inside">
                <li><a href={`/${assembly_type}-wget-download_samples.txt`}>Example script using wget</a></li>
                <li><a href={`/${assembly_type}-curl-download_samples.txt`}>Example script using curl</a></li>
            </ul>
        </div>
    );
};

export default AssemblyExercise;

function GenomeAssemblyQC() {
    const columns = [
      { name: "Column Name", description: "Description" },
      { name: "sample_name", description: "Name or identifier of the genome sample being analyzed." },
      { name: "species", description: "The expected species of the genome. This may not be true." },
      { name: "r1", description: "Path to the forward read file (R1) used for assembly." },
      { name: "r2", description: "Path to the reverse read file (R2) used for assembly." },
      { name: "qc", description: "Overall quality control status (either PASSED or FAILED)." },
      { name: "error", description: "Description of any errors detected during QC (e.g., contamination, low coverage)." },
      { name: "notes", description: "Additional comments or observations about the genome assembly." },
      { name: "fasta", description: "Path to the assembled FASTA file for this sample." },
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Column Name</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {columns.slice(1).map((col, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-2 border font-semibold">{col.name}</td>
                <td className="px-4 py-2 border">{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  