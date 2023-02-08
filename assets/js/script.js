let randomQuoteAPI = "https://api.quotable.io/random";
let nameGeneratorAPI = "https://api.api-ninjas.com/v1/celebrity?name=";
let quoteDisplay = document.querySelector("#quoteDisplay");
let NameButton1 = document.querySelector("#NameButton1");
let NameButton2 = document.querySelector("#NameButton2");
let NameButton3 = document.querySelector("#NameButton3");
let answerbuttons = document.querySelector("#answerbuttons");
let questionNumber = document.querySelector("#questionNumber");
let startButton = document.querySelector("#startButton");
let scoreText = document.querySelector("#score");
let correctAnswer = "";
let correctButton = 0;
let celebrityName = "";
let finalPage = document.querySelectorAll("#finalPage");
let questionImage = document.querySelector("#questionImage")
let playAgainButton = document.querySelector("#playAgainButton")
let score=0;
let scorePoints = 10;


//common name generation from array
let commonNamesArray = [
    "Michael",
    "Steve",
    "Jennifer",
    "Martin",
    "William",
    "Charlotte",
    "Mary",
    "James",
    "Robert",
    "David",
    "Elizabeth",
    "Sarah",
    "Homer",
    "Geoffrey",
    "John",
    "Charles",
    "Emily",
    "George",
    "Henry",
    "Ann",
    "Agatha",
    "Daniel",
];


// function to grab a celebrity name from the api
function randomCelebrityNameGenerator(button) {
    let randomName =
        commonNamesArray[Math.floor(Math.random() * commonNamesArray.length)];
    fetch(nameGeneratorAPI + randomName, {
        headers: { "X-Api-Key": "HM4MOd3dfGVsQX8AqXnjlw==ElN28B6ZXeTJkHQM" },
    })
        .then((response) => response.json())
        .then(function (result) {
            //  console.log(result)

            let randomCelebrityNameArray = result;

            let randomCelebrityName =
                randomCelebrityNameArray[
                Math.floor(Math.random() * randomCelebrityNameArray.length)
                ];
            celebrityName = randomCelebrityName.name;
            button.textContent = celebrityName.toUpperCase();
        });
}

function displayQuote() {
    quoteDisplay.textContent = "";
    fetch(randomQuoteAPI)
        .then((response) => response.json())
        .then(function (result) {
            // console.log(result)

            quoteDisplay.textContent = result.content;
            correctAnswer = result.author;
            //get randomn number between 1 and 3 to randomise button with correct answer
            correctButton = Math.floor(Math.random() * 3) + 1;
            if (correctButton === 1) {
                randomCelebrityNameGenerator(NameButton2);
                randomCelebrityNameGenerator(NameButton3);
                NameButton1.textContent = correctAnswer.toUpperCase();
            } else if (correctButton === 2) {
                randomCelebrityNameGenerator(NameButton1);
                randomCelebrityNameGenerator(NameButton3);
                NameButton2.textContent = correctAnswer.toUpperCase();
            } else {
                randomCelebrityNameGenerator(NameButton1);
                randomCelebrityNameGenerator(NameButton2);
                NameButton3.textContent = correctAnswer.toUpperCase();
            }
            // check the correct answer is displaying on random buttons
            console.log("Correct answer " + correctAnswer.toUpperCase());
            NameButton1.style.backgroundColor = "";
            NameButton2.style.backgroundColor = "";
            NameButton3.style.backgroundColor = "";
        });
}

let number = 0;
function questionNumberDisplay() {
    
    if (number < 11) {
        number++;
    }

    questionNumber.textContent = "Question " + number;
    if (number === 11) {
        answerbuttons.classList.add("hide");
        quoteDisplay.classList.add("hide");
        questionNumber.classList.add("hide");
        questionImage.classList.add("hide");
        for (let i = 0; i < finalPage.length; i++) {

            finalPage[i].classList.remove("hide");
        }
    }

}

function populateAnswers() {
    
    displayQuote();
    questionNumberDisplay();
}

answerbuttons.addEventListener("click", function (event) {

    highlightCorrectAnswer();
    highlightIncorrectAnswers();
    // setTimeout(populateAnswers, 2000)
    populateAnswers()

});

startButton.addEventListener("click", function (event) {
    startButton.classList.add("hide");
    answerbuttons.classList.remove("hide");
    quoteDisplay.classList.remove("hide");
    questionNumber.classList.remove("hide");
    questionImage.classList.remove("hide");

    populateAnswers();
});

function highlightCorrectAnswer() {

    if (NameButton1.innerText === correctAnswer.toUpperCase()) {
        // console.log(" button 1 was correct ");
        NameButton1.style.backgroundColor = "green";
    }
    else if (NameButton2.innerText === correctAnswer.toUpperCase()) {
        // console.log(" button 2 was correct ");
        NameButton2.style.backgroundColor = "green";
    }
    else if (NameButton3.innerText === correctAnswer.toUpperCase()) {
        // console.log(" button 3 was correct ");
        NameButton3.style.backgroundColor = "green";
    }
}
function highlightIncorrectAnswers() {
    
    if(NameButton1.innerText !== correctAnswer.toUpperCase()){
        NameButton1.style.backgroundColor = "red";
    }
    if (NameButton2.innerText !== correctAnswer.toUpperCase()) {
        NameButton2.style.backgroundColor = "red";
    }
    if (NameButton3.innerText !== correctAnswer.toUpperCase()) {
        NameButton3.style.backgroundColor = "red";
    }
 }

 playAgainButton.addEventListener("click", function (event) {
    startButton.classList.remove("hide");
    for (let i = 0; i < finalPage.length; i++) {
    finalPage[i].classList.add("hide");}
    number =0;
 })

 scoreTotal = num => {
    score += num;
    scoreText.innerText = score;

}