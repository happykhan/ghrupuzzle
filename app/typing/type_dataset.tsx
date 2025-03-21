import React from 'react';

interface Sample {
    public_name: string;
    FASTA_URL: string;
}

const TypingExercise: React.FC<{ samples: Sample[], speciesList: string[], samplesheet: { url: string }, typing_type: string}> = ({ samples, speciesList, samplesheet, typing_type }) => {
    return (
        <div>
            <h1>{typing_type === 'real_typing' ? 'Challenge exercise' : 'Practice exercise'}</h1>
            <p>
                You are provided with {samples.length} genome samples belonging to the species <em>{speciesList.join(', ')}</em>. 
                Your task is to:
            </p>
            <ul className="list-disc list-inside">
                <li>Genotype these assemblies using the appropriate tool.</li>
                <li>Extract the required information from the output.</li>
                <li>Format a completed sample sheet.</li>
                <li>Send your completed sample sheet (csv) to {'nabil.alikhan'}{'@'}{'cgps.group'}.</li>                
            </ul>
            <br/>
            <p>
                These are the columns you need to fill in the sample sheet:
            </p>
                <div className="my-4">
                    <KleborateTable />
                </div>
            

            <p>
                <strong>Kleborate</strong> is a tool that can be used to generate the required information from the genome assemblies. You can find more information and download it from <a href="https://github.com/klebgenomics/Kleborate" target="_blank" rel="noopener noreferrer"><strong>Kleborate GitHub repository</strong></a>.
            </p>

            <h2>Sample Sheet</h2>
            <p>
                To help you organize and submit your results, a sample sheet has been provided.  Please download it using the link.
            </p>
            <button className="button is-link is-light"><a href={samplesheet.url}>Download the sample sheet here</a></button>



            <h2>Table of Samples</h2>
            <table className="table is-striped is-bordered">
                <thead>
                    <tr>
                        <th>Sample Name</th>
                        <th>FASTA URL</th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((sample, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">{sample.public_name}</td>
                            <td className="px-4 py-2"><a href={sample.FASTA_URL} target="_blank" rel="noopener noreferrer">{sample.FASTA_URL.split('/').pop()}</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Download Samples</h2>
            <p>You can download the samples in one go on the command line using something like curl or wget. Here are some example script to help:</p>
            <ul className="list-disc list-inside">
                <li><button className="button is-link is-light is-small"><a href={`/${typing_type}-wget-download_samples.txt`}>Example script using wget</a></button></li>
                <li><button className="button is-link is-light is-small"><a href={`/${typing_type}-curl-download_samples.txt`}>Example script using curl</a></button></li>
            </ul>
        </div>
    );
};

export default TypingExercise;

function KleborateTable() {
    const columns = [
      { name: "Column Name", description: "Description" },
      { name: "sample", description: "Name of the input genome (usually derived from the FASTA filename)." },
      { name: "st", description: "Multilocus sequence type (MLST) of the Klebsiella strain (based on allele profiles from housekeeping genes)." },
      { name: "k_locus", description: "Capsular polysaccharide (K) locus type (determined from the genomic sequence, e.g., K2, K64)." },
      { name: "capsule_type", description: "General capsule serotype based on the K-locus." },
      { name: "wzi", description: "Wzi allele number, which corresponds to a surface protein involved in capsule export and can help infer capsular type." },
      { name: "o_locus", description: "O-antigen (O) locus type, which determines the lipopolysaccharide (LPS) serotype (e.g., O1, O2, O3, etc.)." },
      { name: "o_type", description: "General O-antigen serotype inferred from the o_locus." },
      { name: "bla_carb", description: "List of detected carbapenemase genes (e.g., blaKPC, blaNDM, blaOXA-48), which are critical for antibiotic resistance." },
      { name: "species", description: "The species of the genome, as determined by YOU." },
    ];
  
    return (
      <div>
        <table className="table is-striped is-bordered">
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
  