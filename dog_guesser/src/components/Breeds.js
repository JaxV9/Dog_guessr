import React, { useState, useEffect } from 'react';


function Breeds() {

    const [numberBreeds, setNumberBreeds] = useState(null); // To default the dog image to null
    const [numberSubBreeds, setNumberSubBreeds] = useState(null); // To default the dog image to null

    const [average, setAverage] = useState(null); // To default the dog image to null

    useEffect(() => { // Fetch the all the breeds from the API
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(res => res.json())
            .then(data => {
                const numberBreeds = Object.keys(data.message).length;
                let numberSubBreeds = 0;
                for (let breed in data.message) {

                    numberSubBreeds += data.message[breed].length;
                }

                setNumberBreeds(numberBreeds)
                setNumberSubBreeds(numberSubBreeds)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    useEffect(() => { // Fetch the number of images to each breed from the API
        fetch('https://dog.ceo/api/breed/hound/images')
            .then(res => res.json())
            .then(data => {
                //console.log(data.message);

                let count = 0;

                let imgagesEachBreed = [{}]

                for (let url of data.message) {
                    let breeds = url.split('https://images.dog.ceo/breeds/')[1].split('/')[0];
                    let existingBreedIndex = imgagesEachBreed.findIndex(b => b.breed === breeds);

                    if (existingBreedIndex === -1) {

                        imgagesEachBreed.push({ breed: breeds, number: 1 });
                        count++;
                    } else {

                        imgagesEachBreed[existingBreedIndex].number += 1;
                        count++;
                    }
                }

                const numberBreeds = imgagesEachBreed.length - 1;

                let calculate = count / numberBreeds;

                const average = calculate.toFixed(2);

                setAverage(average);

            })
            .catch(err => {
                console.log(err);
            })
    }
        , []);

    return (
        <>
            <div className='navigation'>
                <a href="/">
                    <button className='navigationButton'>Home</button>
                </a><br />
                <a href="/dashboard">
                    <button className='navigationButton'>Dashboard</button>
                </a>
            </div>
            <div className='KPIAPI'>
                <p>The number of dog breeds in the API is {numberBreeds}.</p>
                <p>The number of dog sub-breeds in the API is {numberSubBreeds}.</p>
                <p>The average number of images per breed is {average}.</p>
            </div>
        </>
    );
}

export default Breeds;