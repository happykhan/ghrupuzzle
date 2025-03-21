import React from 'react';

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
            </section>
        </div>
    );
};

export default AboutPage;
