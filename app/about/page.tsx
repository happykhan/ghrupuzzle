import React from 'react';
import Image from 'next/image';

const AboutPage: React.FC = () => {
    return (

        <div className="content">
            <section className="section is-medium">
            <h1 className="title">About Us</h1>
            <p className="text-lg">
                Welcome to <strong>GHRUPuzzles</strong>! These datasets are designed as a skills assessment tool for members  
                of the <strong>Global Health Research Unit (GHRU)</strong> on Genomic Surveillance of Antimicrobial Resistance.  
                However, anyone with an interest in bioinformatics and pathogen genomics is welcome to try these exercises.
            </p>
            
            <p className="mt-4 text-lg">
                GHRU is an international initiative focused on enhancing the capacity for genomic surveillance of antimicrobial  
                resistance (AMR) in pathogens. The project supports researchers and public health professionals worldwide by  
                providing training, tools, and data-sharing platforms to improve outbreak investigations, pathogen tracking,  
                and genomic data analysis.
            </p>

            <p className="mt-4 text-lg">
                GHRUPuzzle offers a series of bioinformatics challenges designed to test and develop core analytical skills,  
                including genome assembly, genotyping, and phylogenetic analysis. Participants can use these exercises to  
                refine their expertise and prepare for real-world genomic surveillance tasks.
            </p>

            <p className="mt-4 text-lg">
                Learn more about GHRU and access additional resources at:     
                <a 
                    href="https://ghru.pathogensurveillance.net/" 
                    className="text-blue-600 hover:underline" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    GHRU Pathogen Surveillance
                </a>.
            </p>
            <p>
              <strong>GHRUPuzzles</strong> by <a href="https://www.pathogensurveillance.net/">Nabil-Fareed Alikhan</a>. All content here is licensed under a Creative Commons Attribution 4.0 International License <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY NC 4.0</a>.               Reuse is encouraged with acknowledgement but only noncommercial uses of the work are permitted. Credit must be given to creator.
            </p>        
                <Image 
                    src="/cc4bync.png"
                    alt="Creative Commons BY NC 4.0 License"
                    width={120}
                    height={100}
                />
            </section>
        </div>
    );
};

export default AboutPage;
