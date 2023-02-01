let randomQuoteAPI = "https://api.quotable.io/random";
let nameGeneratorAPI = "https://api.api-ninjas.com/v1/celebrity?name=";


fetch(randomQuoteAPI)
    .then(response => response.json())
    .then(function (result) {
        console.log(result)
    });

    fetch("https://api.api-ninjas.com/v1/celebrity?name=michael",
      {headers:{"X-Api-Key": "HM4MOd3dfGVsQX8AqXnjlw==ElN28B6ZXeTJkHQM"}}
     )
.then(response => response.json())
.then(data => console.log(data))