let kanyeAPI = "https://api.kanye.rest";
let trumpAPI = "https://api.tronalddump.io/random/quote";


fetch(trumpAPI)
    .then(response => response.json())
    .then(function (result) {
        console.log(result)
    });

fetch(kanyeAPI)
    .then(response => response.json())
    .then(function (result) {
        console.log(result)
    });