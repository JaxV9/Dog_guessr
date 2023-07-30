export function getBreed(Breed, dog) { // Split the url to get the breed
    Breed = dog.split("/")[4]
    Breed = Breed.split("-").join(" ")
    return Breed
}

export function shuffle(array) { // Shuffle the array
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

let score = 0;

function PostScore() {
    const url = `http://localhost:8000/scores/add/${score}`
    const data = { score: score }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    score = 0;
}

export function WinOrLose(CurrentBreed, trueBreed) { // Check if the breed of the dog is the true breed

    let result = document.getElementById("result")
    result.innerHTML = ""

    let h2InResult = document.createElement("h2")
    result.appendChild(h2InResult);
    h2InResult.textContent = ""

    if (CurrentBreed === trueBreed) {
        (console.log("Win"))
        document.getElementById('choices').className = "notDisplay";
        document.getElementById('nextButtonContainer').className = "display";

        score = score + 1;
        console.log(score)
        return h2InResult.textContent = "Win !"
    }
    else {
        (console.log("Lose"))
        document.getElementById('choices').className = "notDisplay";
        document.getElementById('nextButtonContainer').className = "display";
        
        h2InResult.textContent = `Lose ! The true breed was ${trueBreed} ! Your score is ${score} !`
        
        return PostScore()
    }

}