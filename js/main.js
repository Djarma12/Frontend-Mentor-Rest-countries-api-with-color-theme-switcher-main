"use strict";
import countries from "./script.js";

const fieldAllCountries = document.querySelector(".all-countries");
const fieldForCountries = document.querySelector(".js-class");

const option = document.querySelector(".select-continents");

const input = document.querySelector("#country-search");
const btnSearch = document.querySelector(".icon");
const btnBack = document.querySelector(".go-back");
const btnBg = document.querySelector(".btn-light-dark");

try {
  (async function () {
    // Get all countries from API
    countries.fieldForCountries = fieldForCountries;
    const allCountries = await countries.getAllCountries();
    if (!allCountries) {
      throw err;
    }
    countries.allCountries = allCountries;

    // Display automaticly when page is loaded all countries
    countries.displayCountries(allCountries);

    // Display regions for select
    option.addEventListener("click", function (e) {
      option.classList.toggle("helper-class-display-regions");
    });

    //////////////////////////////////////////
    afterApiCall();
  })();
} catch (err) {
  console.log(err);
}

btnSearch.addEventListener("click", async function () {
  countries.foundCountry(input.value);
  countries.displayCountries(countries.allCountries);
});

btnBack.addEventListener("click", function () {
  fieldForCountries.closest(".all-countries").classList.remove("active");
  countries.deleteCountryItself();
});

const afterApiCall = function () {
  fieldAllCountries.addEventListener("click", function (e) {
    console.log(e);
    console.log(e.target);
    if (e.target.classList[0] === "border-countries") {
      countries.foundBorderCountry(e.target.innerHTML);
    }

    if (e.target.closest(".country-item")) {
      countries.foundCountry(
        e.target.closest(".country-item").querySelector("h2").textContent
      );
      countries.displayCountries(countries.allCountries);
    }
  });

  option.addEventListener("click", function (e) {
    if (e.target.closest(".display-regions")) {
      // Remove itself country to display countries
      fieldForCountries.closest(".all-countries").classList.remove("active");

      const regionCountries = countries.allCountries.filter(
        (country) => country.region === e.target.dataset.region
      );
      countries.displayCountries(regionCountries);
      countries.deleteCountryItself();
    }
  });

  input.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
      countries.foundCountry(input.value);
      countries.displayCountries(countries.allCountries);
      return;
    }

    // Function for check if the name of the country we wrote in the input matches the altSpellings
    const sameSpellingsCountries = function (obj, inputValue) {
      const allCount = obj.altSpellings.filter(
        (obj) =>
          obj.slice(0, inputValue.length).toLowerCase() ===
          input.value.toLowerCase()
      );
      if (allCount[0]) return true;
      else return false;
    };

    const inputCount = countries.allCountries.filter((obj) => {
      // Check if the name of the country we wrote in the input matches the common name and altSpellings
      if (
        obj.name.common.slice(0, input.value.length).toLowerCase() ===
          input.value.toLowerCase() ||
        sameSpellingsCountries(obj, input.value)
      ) {
        return obj;
      }
    });

    countries.displayCountries(inputCount);
    countries.deleteCountryItself();
  });
};

btnBg.addEventListener("click", function () {
  document.querySelector("body").classList.toggle("dark-bg");
});
