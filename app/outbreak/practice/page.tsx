'use client'
import React, { useEffect, useState } from 'react';
import OutbreakExercise from '../outbreak_dataset';

const OutbreakPage = () => {
    interface Sample {
        public_name: string;
        R1_URL: string;
        R2_URL: string;
    }

    const [samples, setSamples] = useState<Sample[]>([]);
    const [speciesList, setSpeciesList] = useState([]);
    const [samplesheet, setSamplesheet] = useState<{ url: string }>({ url: '' });    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/practice_outbreak_file_details.json')
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
        <div className="flex flex-col items-center max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1>Outbreak puzzle</h1>
            {loading ? (
                <div><p>The today&apos;s genome puzzle is loading...</p></div>
            ) : (
            <div>
                <p>
                    Welcome to this genome puzzle, a challenge designed to test your bioinformatics skills, and/or benchmark the 
                    performance of your tools or pipelines for phylogenetics and outbreak detection. 
                </p>
                

                <div className="my-4"></div>
        {loading ? (
                <div><p>The today&apos;s genome puzzle is loading...</p></div>
            ) : (
                <OutbreakExercise samples={samples} speciesList={speciesList} samplesheet={samplesheet} outbreak_type='practice_outbreak'/>
            )}
            </div>
            )}
        </div>
    );
};


export default OutbreakPage;
