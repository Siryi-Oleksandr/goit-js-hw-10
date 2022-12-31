import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  outputList: document.querySelector('.country-list'),
  outputCountryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// set function
function onFormInput() {
  const countryName = refs.input.value.trim();
  fetchCountries(countryName).then(showCountryList).catch(handleError);
  // подумати чи потрібно очищати форму
}

function showCountryInfo(countryData) {
  const { capital, name, population, flagSrc, languages } =
    getData(countryData);
  refs.outputCountryInfo.innerHTML = `<div class="country-name__wrapper">
      <img class="country-flag" src="${flagSrc}" alt="flag of the country ${name}">
      <h1 class="country-name">${name}</h1>
    </div><p><b>Capital: </b>${capital}</p>
    <p><b>Population: </b>${population}</p>
    <p><b>Languages: </b>${languages}</p>`;
}

// render list of the countries, which satisfy the request
function showCountryList(countriesData) {
  const countriesList = getData(countriesData);
  const listCountriesMarkup = countriesList
    .map(
      ({
        flagSrc,
        name,
      }) => `<li class="country-list__item"><img class="country-flag--sm" src="${flagSrc}" alt="flag of the country ${name}" />
      <p class="country-name--sm">${name}</p></li>`
    )
    .join('');

  refs.outputList.innerHTML = listCountriesMarkup;
  /* 
  <li class="country-list__item"><img class="country-flag--sm" src="" alt="" />
      <p class="country-name--sm"></p></li>
  */
}

function handleError(error) {
  Notify.failure('Oops, there is no country with that name');
}

function getData(countriesData) {
  const receivedDataArray = countriesData.map(elem => {
    const receivedData = {};
    receivedData.capital = elem.capital.join(', ');
    receivedData.name = elem.name.official;
    receivedData.population = elem.population;
    receivedData.flagSrc = elem.flags.svg;
    receivedData.languages = Object.values(elem.languages).join(', ');
    return receivedData;
  });
  return receivedDataArray;
}

/* function getData(countryData) {
  const receivedData = {};
  countryData.forEach(elem => {
    receivedData.capital = elem.capital.join(', ');
    receivedData.name = elem.name.official;
    receivedData.population = elem.population;
    receivedData.flagSrc = elem.flags.svg;
    receivedData.languages = Object.values(elem.languages).join(', ');
  });
  return receivedData;
} */

// ukraine
// united
// tanzan
// South Africa
