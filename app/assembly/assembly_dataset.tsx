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
            <ul>
                <li>Use a <em>de novo</em> genome assembly tool to assemble the genome.</li>
                <li>Assess the quality of the resulting genome assembly.</li>
                <li>Format a completed sample sheet.</li>
                <li>Send your completed sample sheet (csv) to {'nabil.alikhan'}{'@'}{'cgps.group'}</li>
            </ul>

            These are the columns you need to fill in the sample sheet:
                <GenomeAssemblyQC/>
            <br/>
            <strong>Other Instructions</strong>
            <ul>
            <li>If a sample is potentially contaminated with multiple species, report “CONTAMINATED” in the species column.</li>
            <li>If confident in the assembly, report the determined species (e.g., <em>Klebsiella pneumoniae</em>).</li>
            </ul>

            <h2>Sample Sheet</h2>
            <p>
                To help you organize and submit your results, a sample sheet has been provided. Please download it using the link.
            </p>
            <button className="button is-link is-light"><a href={samplesheet.url}>Download the sample sheet here</a></button>
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
            <p>You can download the samples in one go on the command line using something like curl or wget. Here are some example scripts to help:</p>
            <ul>
                <li><button className="button is-link is-light is-small"><a href={`/${assembly_type}-wget-download_samples.txt`}>Example script using wget</a></button></li>
                <li><button className="button is-link is-light is-small"><a href={`/${assembly_type}-curl-download_samples.txt`}>Example script using curl</a></button></li>
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
              <tr key={index}>
              <td>{col.name}</td>
              <td>{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  