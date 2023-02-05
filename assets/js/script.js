let randomQuoteAPI = "https://api.quotable.io/random";
let nameGeneratorAPI = "https://api.api-ninjas.com/v1/celebrity?name=";
let quoteDisplay = document.querySelector("#quoteDisplay");
let NameButton1 = document.querySelector("#NameButton1");
let NameButton2 = document.querySelector("#NameButton2");
let NameButton3 = document.querySelector("#NameButton3");
let correctAnswer = "";
let correctButton = 0;

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
];

fetch(`https://api.api-ninjas.com/v1/celebrity?name=""`, {
  headers: { "X-Api-Key": "HM4MOd3dfGVsQX8AqXnjlw==ElN28B6ZXeTJkHQM" },
})
  .then((response) => response.json())
  .then((data) => console.log(data));

let answerbuttons = document.querySelector("#answerbuttons");
let questionNumber = document.querySelector("#questionNumber");
let startButton = document.querySelector("#startButton");

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

      let celebrityName = JSON.stringify(randomCelebrityName.name);

      button.textContent = celebrityName.toUpperCase();
    });
}

//displayQuote();

function displayQuote() {
  quoteDisplay.textContent = "";
  fetch(randomQuoteAPI)
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result)

      quoteDisplay.textContent = result.content;
      correctAnswer = JSON.stringify(result.author);
      //get randomn number between 1 and 3 to randomise button with correct answer
      correctButton = Math.floor(Math.random() * 3) + 1;
      if (correctButton == 1) {
        NameButton1.textContent = correctAnswer.toUpperCase();
        randomCelebrityNameGenerator(NameButton2);
        randomCelebrityNameGenerator(NameButton3);
      } else if (correctButton == 2) {
        NameButton2.textContent = correctAnswer.toUpperCase();
        randomCelebrityNameGenerator(NameButton1);
        randomCelebrityNameGenerator(NameButton3);
      } else {
        NameButton3.textContent = correctAnswer.toUpperCase();
        randomCelebrityNameGenerator(NameButton1);
        randomCelebrityNameGenerator(NameButton2);
      }
      // check the correct answer is displaying on random buttons
      console.log("Correct answer " + correctAnswer.toUpperCase());
    });
}

let number = 0;
function questionNumberDisplay() {
  if (number < 10) {
    number++;
  }

  questionNumber.textContent = "Question " + number;
}

function populateAnswers() {
  // highlight current answer before showing next question
  if (number > 0) {
    highlightCorrectAnswer();
  }

  displayQuote();

  //randomCelebrityNameGenerator(NameButton2);
  //randomCelebrityNameGenerator(NameButton3);
  questionNumberDisplay();
}

answerbuttons.addEventListener("click", function (event) {
  populateAnswers();
});

startButton.addEventListener("click", function (event) {
  startButton.classList.add("hide");
  answerbuttons.classList.remove("hide");
  quoteDisplay.classList.remove("hide");
  questionNumber.classList.remove("hide");

  populateAnswers();
});

function highlightCorrectAnswer() {
  console.log("answerbutton1 " + NameButton1.innerText);
  console.log("answerbutton2 " + NameButton2.innerText);
  console.log("answerbutton3 " + NameButton3.innerText);
  console.log("correct answer " + correctAnswer);

  if (NameButton1.innerText == correctAnswer.toUpperCase()) {
    console.log(" button 1 was correct ");
  } else if (NameButton2.innerText == correctAnswer.toUpperCase()) {
    // button 2 was correct answer
  } else {
    // button 3 was correct answer
  }
  // pause for 5 seconds so that the User can see the correct answer
}
