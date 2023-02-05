let randomQuoteAPI = "https://api.quotable.io/random";
let nameGeneratorAPI = "https://api.api-ninjas.com/v1/celebrity?name=";
let quoteDisplay = document.querySelector("#quoteDisplay");
let NameButton1 = document.querySelector("#NameButton1");
let NameButton2 = document.querySelector("#NameButton2");
let NameButton3 = document.querySelector("#NameButton3");
let answerbuttons = document.querySelector("#answerbuttons")
let questionNumber = document.querySelector("#questionNumber")
let startButton = document.querySelector("#startButton")


// common name generation from array
let commonNamesArray = ["michael", "Steve", "Jennifer", "Martin", "William", "Charlotte", "Mary", "James", "Robert", "David", "Elizabeth", "Sarah"]



// function to grab a celebrity name from the api
function randomCelebrityNameGenerator(button) {
    let randomName = commonNamesArray[Math.floor(Math.random() * commonNamesArray.length)]
    fetch(nameGeneratorAPI + randomName,
        { headers: { "X-Api-Key": "HM4MOd3dfGVsQX8AqXnjlw==ElN28B6ZXeTJkHQM" } }
    )
        .then(response => response.json())
        .then(function (result) {
            //  console.log(result)

            let randomCelebrityNameArray = result;

            let randomCelebrityName = randomCelebrityNameArray[Math.floor(Math.random() * randomCelebrityNameArray.length)];

            let celebrityName = randomCelebrityName.name;

            button.textContent = celebrityName;

        })
}



function displayQuote() {
    quoteDisplay.textContent = ""
    fetch(randomQuoteAPI)
        .then(response => response.json())
        .then(function (result) {
            // console.log(result)

            quoteDisplay.textContent = result.content;
            NameButton1.textContent = result.author;
        });
}

let number = 0
function questionNumberDisplay() {

    if (number < 10) {
        number++

    }

    questionNumber.textContent = "Question " + number

}

function populateAnswers() {
    displayQuote()

    randomCelebrityNameGenerator(NameButton2)
    randomCelebrityNameGenerator(NameButton3)
    questionNumberDisplay()
}

answerbuttons.addEventListener("click", function (event) {
    populateAnswers()
})

startButton.addEventListener("click", function (event) {

    startButton.classList.add("hide")
    answerbuttons.classList.remove("hide")
    quoteDisplay.classList.remove("hide")
    questionNumber.classList.remove("hide")

    populateAnswers()

})