let randomQuoteAPI = "https://api.quotable.io/random";
let nameGeneratorAPI = "https://api.api-ninjas.com/v1/celebrity?name=";
let quoteDisplay = document.querySelector("#quoteDisplay");
let NameButton1 = document.querySelector("#NameButton1");
let NameButton2 = document.querySelector("#NameButton2");
let NameButton3 = document.querySelector("#NameButton3");
let answerButtons = document.querySelector("#answerButtons");
let questionNumber = document.querySelector("#questionNumber");
let startButton = document.querySelector("#startButton");
let scoreText = document.querySelector("#score");
let correctAnswer = "";
let wrongAnswer1 = "";
let wrongAnswer2 = "";
let correctButton = 0;
let randomCelebrityName = "";
let indexCeleb = 0;
let nameArrayLength = 0;
let finalPage = document.querySelectorAll("#finalPage");

let questionImage = document.querySelector("#questionImage");
let playAgainButton = document.querySelector("#playAgainButton");
// if the random celebrity button returns empty use "MC CRUZ"
let celebrityName = "MC CRUZ";

let score = 0;

let scorePoints = 1;
let choices = Array.from(document.getElementsByClassName("choices"));

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
  "John",
  "Charles",
  "Emily",
  "George",
  "Henry",
  "Ann",
  "Daniel",
];

// function to grab a celebrity name from the api
async function randomCelebrityNameGenerator() {
  let randomName =
    commonNamesArray[Math.floor(Math.random() * commonNamesArray.length)];
  await fetch(nameGeneratorAPI + randomName, {
    headers: { "X-Api-Key": "HM4MOd3dfGVsQX8AqXnjlw==ElN28B6ZXeTJkHQM" },
  })
    .then((response) => response.json())
    .then(function (result) {
      //   console.log(result);

      let randomCelebrityNameArray = result;
      nameArrayLength = randomCelebrityNameArray.length;
      indexCeleb = Math.floor(Math.random() * nameArrayLength + 1);
      //   console.log("index = " + indexCeleb);
      randomCelebrityName = randomCelebrityNameArray[indexCeleb];
      //console.log(
      // "celebrityName.toUpperCase()  " + celebrityName.toUpperCase()
      //);

      //button.textContent = celebrityName.toUpperCase();
    });

  if (randomCelebrityName != null) {
    celebrityName = randomCelebrityName.name;
  }

  return celebrityName.toUpperCase();
}

async function displayQuote() {
  quoteDisplay.textContent = "";
  wrongAnswer1 = await randomCelebrityNameGenerator();
  wrongAnswer2 = await randomCelebrityNameGenerator();
  await fetch(randomQuoteAPI)
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result)

      quoteDisplay.textContent = result.content;
      correctAnswer = result.author.toUpperCase();
    });
  //get randomn number between 1 and 3 to randomise button with correct answer

  correctButton = Math.floor(Math.random() * 3) + 1;
  if (correctButton === 1) {
    NameButton1.textContent = correctAnswer;
    NameButton2.textContent = wrongAnswer1;
    NameButton3.textContent = wrongAnswer2;
  } else if (correctButton === 2) {
    NameButton1.textContent = wrongAnswer1;
    NameButton2.textContent = correctAnswer;
    NameButton3.textContent = wrongAnswer2;
  } else {
    NameButton1.textContent = wrongAnswer2;
    NameButton2.textContent = wrongAnswer1;
    NameButton3.textContent = correctAnswer;
  }
  // check the correct answer is displaying on random buttons
  console.log("Correct answer " + correctAnswer.toUpperCase());
  NameButton1.style.backgroundColor = "";
  NameButton2.style.backgroundColor = "";
  NameButton3.style.backgroundColor = "";
}

let number = 0;
function questionNumberDisplay() {
  if (number < 11) {
    number++;
  }

  questionNumber.textContent = "Question " + number;
  if (number === 11) {
    answerButtons.classList.add("hide");
    quoteDisplay.classList.add("hide");
    questionNumber.classList.add("hide");
    questionImage.classList.add("hide");
    for (let i = 0; i < finalPage.length; i++) {
      finalPage[i].classList.remove("hide");
    }
  }
}

async function populateAnswers() {
  await displayQuote();
  questionNumberDisplay();
}

answerButtons.addEventListener("click", function (event) {
  highlightCorrectAnswer();
  setTimeout(populateAnswers, 1000);
  //   populateAnswers();
});

startButton.addEventListener("click", function (event) {
  startButton.classList.add("hide");
  answerButtons.classList.remove("hide");
  quoteDisplay.classList.remove("hide");
  questionNumber.classList.remove("hide");
  questionImage.classList.remove("hide");
  score = 0;
  populateAnswers();
});

function highlightCorrectAnswer() {
  if (NameButton1.innerText === correctAnswer.toUpperCase()) {
    // console.log(" button 1 was correct ");
    NameButton1.style.backgroundColor = "green";
    NameButton2.style.backgroundColor = "red";
    NameButton3.style.backgroundColor = "red";
  } else if (NameButton2.innerText === correctAnswer.toUpperCase()) {
    // console.log(" button 2 was correct ");
    NameButton2.style.backgroundColor = "green";
    NameButton1.style.backgroundColor = "red";
    NameButton3.style.backgroundColor = "red";
  } else if (NameButton3.innerText === correctAnswer.toUpperCase()) {
    // console.log(" button 3 was correct ");
    NameButton3.style.backgroundColor = "green";
    NameButton1.style.backgroundColor = "red";
    NameButton2.style.backgroundColor = "red";
  }
}

playAgainButton.addEventListener("click", function (event) {
  startButton.classList.remove("hide");
  for (let i = 0; i < finalPage.length; i++) {
    finalPage[i].classList.add("hide");
  }
  number = 0;
  score = 0;
});

scoreTotal = (num) => {
  score += num;
  scoreText.innerText = "Your score is " + score + " out of 10.";
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // console.log(e.target)
    if (e.target.innerText === correctAnswer.toUpperCase()) {
      scoreTotal(scorePoints);
    }
  });
});
