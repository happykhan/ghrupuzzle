'use client'
import React, { useEffect, useState }from 'react';
import TypingExercise from '../type_dataset';

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
                <TypingExercise samples={samples} speciesList={speciesList} samplesheet={samplesheet} typing_type='practice_typing'/>
            )}
      </div>
  );

};


