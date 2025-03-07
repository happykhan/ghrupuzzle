import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center max-w-[800px] mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to GHRUPuzzles</h1>
      <p className="text-lg">
      <strong>GHRUPuzzle</strong> are controlled datasets designed to challenge and enhance the bioinformatics skills of GHRU members.  
        Through a series of structured exercises (puzzles), participants can test and refine their expertise in key bioinformatics  
        workflows, including genome assembly, genotyping, and phylogenetic analysis for outbreak investigations.
      </p>
      
      <p className="mt-4 text-lg">
        Each puzzle presents real-world bioinformatics scenarios, requiring participants to analyze sequencing data, interpret  
        results, and replicate expected outputs. Successfully reproducing these results demonstrates proficiency in:
      </p>
      <ul className="mt-2 text-lg text-left list-disc list-inside">
        <li>Deploying and running bioinformatics software</li>
        <li>Performing quality control and interpreting results</li>
        <li>Operating within a computational environment</li>
      </ul>

      <p className="mt-4 text-lg">
        Participants will have access to practice puzzles, allowing them to build confidence and refine their skills at their own pace.  
        Additionally, a scheduled <strong>testing drill exercise</strong> will be conducted, where participants must complete a set of  
        puzzles within a defined timeframe under <strong>test conditions</strong>. This drill will simulate real-world time constraints  
        and decision-making pressures, helping participants prepare for high-stakes bioinformatics tasks in research and outbreak response.
        Successful completion of the drill will earn participants a certificate of achievements and the bioinformatics seal of approval.
      </p>
    </div>
  );
}
