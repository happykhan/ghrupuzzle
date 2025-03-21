'use client'
import React, { useEffect, useState } from 'react';
import OutbreakExercise from './outbreak_dataset';

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
    const [releaseTime, setReleaseTime] = useState<string | null>(null);

    useEffect(() => {
        fetch('/real_outbreak_file_details.json')
            .then(response => response.json())
            .then(data => {
                console.log('File details:', data);
                setSamples(data.samples);
                setSpeciesList(data.answer_sheet.species); 
                setSamplesheet(data.sample_sheet);
                setReleaseTime(data.release_date);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching the file details:', error);
                setLoading(false);
            });
    }, []);



  return (
    <div className="content">
      <section className="section is-medium">

        <h1 className='title'>
          Outbreak puzzle
        </h1>
        <p>
                    Welcome to this genome puzzle, a challenge designed to test your bioinformatics skills, and/or benchmark the 
                    performance of your tools or pipelines for phylogenetics and outbreak detection. 
                </p>
        {loading ? (
                <div><p>The today&apos;s genome puzzle is loading...</p></div>
            ) : (
            <div>

              {releaseTime ? (
              new Date() > new Date(releaseTime) ? (
                <OutbreakExercise samples={samples} speciesList={speciesList} samplesheet={samplesheet} outbreak_type='real_outbreak'/>
                
              ) : (
                <div>
                <p>The challenge data is not released yet. <strong>The data will be available on {new Date(releaseTime).toLocaleString()}</strong>. Please try the practice exercise instead.</p>
                <button className="button is-link is-light"><a href="/outbreak/practice" className="text-blue-500 underline text-lg">Go to Practice Exercise</a></button>
                </div>
              )
              ) : (
              <div>
                <p>The data is not available yet. Please try the practice exercise instead.</p>
                <button className="button is-link is-light"><a href="/outbreak/practice" className="text-blue-500 underline text-lg">Go to Practice Exercise</a></button>
              </div>
              )}
            </div>
                  )} 
      </section>
    </div>
  );
}

export default OutbreakPage;


