"use strict";

class Countries {
  allCountries;
  fieldForCountries;
  countryItself;
  borderCountriesArr;
  api_url = "https://restcountries.com/v3.1/";

  async getAllCountries(data = "all") {
    try {
      const countries = await fetch(this.api_url + data).then((res) =>
        res.json()
      );
      this.allCountries = countries;
      return countries;
    } catch (err) {
      this.errorMessage();
      // throw 'Can not get data from server!';
    }
  }

  errorMessage() {
    const html = `
    <div class="err-message">
          <p>Can not get data from server!</p>
        </div>
    `;
    this.fieldForCountries.insertAdjacentHTML("afterbegin", html);
  }

  displayCountries(countriesForDisplay) {
    this.fieldForCountries.innerHTML = "";
    countriesForDisplay.forEach((obj) => {
      let html = `
      <div class="country-item">       
        <img class="flag" src="${obj.flags.png}" alt="Country" />

        <div class="country-details">
          <h2>${obj.name.common}</h2>
          <div class="details-country-grid">
            <p>Population: <span>${obj.population.toLocaleString()}</span></p>
            <p>Region: <span>${obj.region}</span></p>
            <p>Capital: <span>${obj.capital?.[0]}</span></p>
          </div>
        </div>
      </div>
      `;

      this.fieldForCountries.insertAdjacentHTML("beforeend", html);
    });
  }

  validator(arg, obj) {
    if (arg.length !== 0) return obj;
  }

  borderCountries() {
    let html = ``;
    this.borderCountriesArr.forEach((count) => {
      html += `<li class="border-countries">${count}</li>`;
    });
    return html;
  }

  displayCountry() {
    console.log(Object.values(this.countryItself.languages).join(", "));
    this.borderCountriesArr = this.countryItself.borders;
    console.log(this.countryItself.name.common);
    const html = `
    <div class="country-flag-details grid--2-cols">
              <img src="${this.countryItself.flags.png}">
              <div class="country-details-itself">
                <h2>${this.countryItself.name.common}</h2>
                <ul class="country-details-list grid--2-cols">
                <div>
                  <li>
                    Native Name: <span>${
                      this.countryItself.name.official
                    }</span>
                  </li>
                  <li>
                    Population: <span>${this.countryItself.population.toLocaleString()}</span>
                  </li>
                  <li>
                    Region: <span>${this.countryItself.region}</span>
                  </li>
                  <li>
                    Sub Region: <span>${this.countryItself.subregion}</span>
                  </li>
                  <li>
                    Capital: <span>${this.countryItself.capital?.[0]}</span>
                  </li>
                  </div>
                  <div class="col-2">
                  <li>
                    Top Level Domain: <span>${this.countryItself.tld?.join(
                      " "
                    )}</span>
                  </li>
                  <li>
                    Currencies: <span>${
                      Object.values(this.countryItself.currencies)[0].name
                    }</span>
                  </li>
                  <li>
                    Languages: <span>${Object.values(
                      this.countryItself.languages
                    ).join(", ")}</span>
                  </li>
                  </div>
                </ul>

                <div class="border-countries-all grid--2-cols-auto">
                  
                    <span class="border-count-text">Border countries: </span>
                    <ul class="border-countries-list grid--4-cols">
                    ${
                      this.countryItself.borders
                        ? this.borderCountries(this.countryItself.borders)
                        : "No borders"
                    }
                    </ul>
                  
                </div>
              </div>
            </div>`;
    this.fieldForCountries
      .closest(".all-countries")
      .querySelector(".country-itself")
      .insertAdjacentHTML("beforeend", html);
  }

  // Find country in all countries
  foundCountry(countryInput) {
    console.log(countryInput);
    console.log(this.allCountries[0].name.common.toLowerCase());
    let countryContent = this.allCountries.filter(
      (obj) => obj.name.common.toLowerCase() === countryInput.toLowerCase()
    );
    this.countryItself = this.validator(countryContent, countryContent[0]);

    console.log(this.countryItself);
    if (this.countryItself) {
      this.deleteCountryItself();
      this.fieldForCountries.closest(".all-countries").classList.add("active");
      this.fieldForCountries
        .closest("body")
        .querySelector("#country-search").value = "";
      this.displayCountry();
    }
  }

  deleteCountryItself() {
    this.fieldForCountries
      .closest(".all-countries")
      .querySelector(".country-flag-details")
      ?.remove();
  }

  foundBorderCountry(countryName) {
    let [countryContent] = this.allCountries.filter(
      (obj) => obj.cca3 == countryName
    );
    this.countryItself = countryContent;

    this.deleteCountryItself();
    this.displayCountry();
  }
}

export default new Countries();
