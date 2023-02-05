let randomQuoteAPI = "https://api.quotable.io/random";
let nameGeneratorAPI = "https://api.api-ninjas.com/v1/celebrity?name=";
let quoteDisplay = document.querySelector("#quoteDisplay");
let NameButton1 = document.querySelector("#NameButton1");
let NameButton2 = document.querySelector("#NameButton2");
let NameButton3 = document.querySelector("#NameButton3");

// common name generation from array
let commonNamesArray = [
  "michael",
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

fetch("https://api.api-ninjas.com/v1/celebrity?name=michael", {
  headers: { "X-Api-Key": "HM4MOd3dfGVsQX8AqXnjlw==ElN28B6ZXeTJkHQM" },
})
  .then((response) => response.json())
  .then((data) => console.log(data));

displayQuote();

function displayQuote() {
  fetch(randomQuoteAPI)
    .then((response) => response.json())
    .then(function (result) {
      console.log(result);

      quoteDisplay.textContent = result.content;
    });
}
// function to grab a celebrity name from the api
function randomCelebrityNameGenerator(button) {
  let randomName =
    commonNamesArray[Math.floor(Math.random() * commonNamesArray.length)];
  fetch("https://api.api-ninjas.com/v1/celebrity?name=" + randomName, {
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

      let celebrityName = randomCelebrityName.name;

      button.textContent = celebrityName;
    });
}

randomCelebrityNameGenerator(NameButton2);
randomCelebrityNameGenerator(NameButton3);

displayQuote();

function displayQuote() {
  fetch(randomQuoteAPI)
    .then((response) => response.json())
    .then(function (result) {
      // console.log(result)

      quoteDisplay.textContent = result.content;
      NameButton1.textContent = result.author;
    });
}
