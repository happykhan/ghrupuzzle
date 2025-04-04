'use client'
import React, { useEffect, useState }from 'react';
import TypingExercise from './type_dataset';

export default function TypingPage() {
    interface Sample {
      public_name: string;
      FASTA_URL: string;
  }  
  const [samples, setSamples] = useState<Sample[]>([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [samplesheet, setSamplesheet] = useState<{ url: string }>({ url: '' });    
  const [loading, setLoading] = useState(true);
  const [releaseTime, setReleaseTime] = useState<string | null>(null);

  useEffect(() => {
    fetch('/real_typing_file_details.json')
        .then(response => response.json())
        .then(data => {
            console.log('File details:', data);
            setSamples(data.samples);
            setSpeciesList(data.answer_sheet.species); 
            setSamplesheet(data.sample_sheet);
            setLoading(false);
            setReleaseTime(data.release_date);

        })
        .catch(error => {
            console.error('Error fetching the file details:', error);
            setLoading(false);
        });
}, []);

  return (
    <div className="content">
            <section className="section is-medium">
        <h1>
          Genotyping puzzle
        </h1>
        <p>
            Welcome to this genome puzzle, a challenge designed to test your bioinformatics skills. This is an excellent 
            opportunity to demonstrate your expertise in genotyping.
        </p>
        <div className="container"></div>
        {loading ? (
                <div><p>The today&apos;s genome puzzle is loading...</p></div>
            ) : (
            <div>

              {releaseTime ? (
              new Date() > new Date(releaseTime) ? (
                <TypingExercise samples={samples} speciesList={speciesList} samplesheet={samplesheet} typing_type='real_typing'/>
                
              ) : (
                <div>
                <p>The challenge data is not released yet. <strong>The data will be available on {new Date(releaseTime).toLocaleString()}</strong>. Please try the practice exercise instead.</p>
                <button className='button is-light is-link'><a href="/typing/practice" className="text-blue-500 underline text-lg">Go to Practice Exercise</a></button>  
                </div>
              )
              ) : (
              <div>
                <p>The data is not available yet. Please try the practice exercise instead.</p>
                <button className='button is-light is-link'><a href="/typing/practice" className="text-blue-500 underline text-lg">Go to Practice Exercise</a></button>
              </div>
              )}
            </div>
                  )} 
                  </section>
              </div>
          );
      }

