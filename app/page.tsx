import React from 'react';

export default function Home() {
  return (
    <div className="content">
      <section className="section is-medium">
      <h1 className="title">Welcome to GHRUPuzzles</h1>
      <p>
      <strong>GHRUPuzzles</strong> are controlled datasets designed to challenge and enhance the bioinformatics skills of GHRU members.  
        Through a series of structured exercises (puzzles), participants can test and refine their expertise in key bioinformatics  
        workflows, including genome assembly, genotyping, and phylogenetic analysis for outbreak investigations.
      </p>
      
      <p>
        Each puzzle presents real-world bioinformatics scenarios, requiring participants to analyze sequencing data, interpret  
        results, and replicate expected outputs. Successfully reproducing these results demonstrates proficiency in:
      </p>
      <ul>
        <li>Deploying and running bioinformatics software</li>
        <li>Performing quality control and interpreting results</li>
        <li>Operating within a computational environment</li>
      </ul>

      <p>
        Participants will have access to practice puzzles, allowing them to build confidence and refine their skills at their own pace.  
        Additionally, a scheduled <strong>testing drill exercise</strong> will be conducted, where participants must complete a set of  
        puzzles within a defined timeframe. This drill will simulate real-world time constraints  
        and decision-making pressures, helping participants prepare for high-stakes bioinformatics tasks in research and outbreak response.
      </p>
      <p className="mt-4 text-lg">  
        Successful completion of the drill will earn participants a certificate of achievements and the bioinformatics seal of approval.
      </p>
      </section>
    </div>
  );
}
