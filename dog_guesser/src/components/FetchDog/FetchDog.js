import React, { useState, useEffect } from 'react';
import { getBreed, shuffle, WinOrLose } from './FetchDogFunc';
import './FetchDog.css';

function FetchDog() {

    const [dogImage, setDogImage] = useState(null); // To default the dog image to null
    const [dogImage2, setDogImage2] = useState(null); // To default the dog image to null
    const [dogImage3, setDogImage3] = useState(null); // To default the dog image to null

    const [reloadFetch, setReloadFetch] = useState(0); // To reload the fetch

    function nextBreed() {
        let result = document.getElementById("result");
        result.innerHTML = "";

        // Reload the fetch to get new breeds
        setReloadFetch(prev => prev + 1);

        document.getElementById('choices').className = "display";
        document.getElementById('nextButtonContainer').className = "notDisplay";
    }

    useEffect(() => { // Fetch the message from the API
        const fetchBreeds = async () => {
            try {
                const responses = await Promise.all([
                    fetch('https://dog.ceo/api/breeds/image/random'),
                    fetch('https://dog.ceo/api/breeds/image/random'),
                    fetch('https://dog.ceo/api/breeds/image/random')
                ]);

                const breeds = await Promise.all(responses.map(r => r.json())); // Get the json from the API
                const datas = breeds.map(breed => breed.message); // Get the message from the json
                const OneUrl = new Set(datas); // Delete the same urls

                if (OneUrl.size < 3) { // If there is less than 3 urls, reload the page
                    fetchBreeds();
                } else {
                    setDogImage(datas[0]); // Get the dog image and the true breed
                    setDogImage2(datas[1]); // Get the false breed
                    setDogImage3(datas[2]); // Get the false breed
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBreeds();
    }, [reloadFetch]);

    let Breed = ""
    let FalseBreed = ""
    let FalseBreed2 = ""

    if (dogImage || dogImage2 || dogImage3) {         // Split the url to get the breed
        Breed = getBreed(Breed, dogImage)
        FalseBreed = getBreed(FalseBreed, dogImage2)
        FalseBreed2 = getBreed(FalseBreed2, dogImage3)

        document.getElementById('nextButtonContainer').className = "notDisplay";
    }

    let Breeds = [Breed, FalseBreed, FalseBreed2] // Contain all breeds (true and false)

    Breeds = shuffle(Breeds) // Shuffle the array

    console.log(Breed)

    return (
        <>
            <div className='navigation'>
                <a href="/breed">
                    <button className='navigationButton'>KPI about the API</button>
                </a><br />
                <a href="/dashboard">
                    <button className='navigationButton'>Dashboard</button>
                </a>
            </div>
            <div>
                <h1>Which breed is ?</h1>
                <div id="result"></div>
                <div id="nextButtonContainer">
                    <button className="nextButton" onClick={nextBreed}>Next</button>
                </div>
                <div className="imageDogContainer">
                    {dogImage && <img src={dogImage} className="imageDog" alt="Random Dog" />} {/* If dog is charged, the image is charged too */}
                    {!dogImage && <p>Loading...</p>} {/* Otherwise it's loading */}
                </div>
            </div>
            <div id="choices">
                <button className="buttonBreed" value={Breeds[0]} onClick={() => WinOrLose(Breeds[0], Breed)}>{Breeds[0]}</button>
                <button className="buttonBreed" value={Breeds[1]} onClick={() => WinOrLose(Breeds[1], Breed)}>{Breeds[1]}</button>
                <button className="buttonBreed" value={Breeds[2]} onClick={() => WinOrLose(Breeds[2], Breed)}>{Breeds[2]}</button>
            </div>
            <p className="min">The answer in the console !</p>
        </>
    );
}

export default FetchDog;