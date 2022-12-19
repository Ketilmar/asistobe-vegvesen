const Counties = require("./my-data/my-json/counties.json");
const Municipalities = require("./my-data/my-json/municipalities.json");
const prompt = require("prompt-sync")({ sigint: true });
const FetchData = require("./FetchData");

// Koden kan enten kjøres lokalt eller i egen Docker container
// For å kjøre koden lokalt må du skrive følgende kommandoer i terminalen:
// npm install
// node temporary.js

const countiesList = Counties.map((county) => {
  return county.name;
});

const municipalityList = Municipalities.map((municipality) => {
  return municipality.name;
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const county = capitalizeFirstLetter(prompt("Give a county: "));
console.log(county);

const municipality = capitalizeFirstLetter(prompt("Give a municipality: "));
console.log(municipality);

const dateFrom = prompt("Give a from date (yyyy-mm-dd): ");
console.log(dateFrom);

const dateTo = prompt("Give a to date (yyyy-mm-dd): ");
console.log(dateTo);

const response = prompt("Do the dates have the correct format? ");

const dateCheck = () => {
  if (response === "yes") {
    inputChecker(county, municipality, dateFrom, dateTo);
  } else {
    console.log("Try again");
  }
};

const inputChecker = (county, municipality, dateFrom, dateTo) => {
  if (
    countiesList.includes(county) &&
    municipalityList.includes(municipality)
  ) {
    FetchData(county, municipality, dateFrom, dateTo);
  } else {
    console.log("Wrong county or municipality name");
  }
};

dateCheck();
