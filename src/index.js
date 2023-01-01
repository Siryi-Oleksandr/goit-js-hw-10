import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const infoMessage =
  'Too many matches found. Please enter a more specific name.';
const errorMessage = 'Oops, there is no country with that name';

const refs = {
  input: document.querySelector('#search-box'),
  outputList: document.querySelector('.country-list'),
  outputCountryInfo: document.querySelector('.country-info'),
};

const notifyOptions = {
  showOnlyTheLastOne: true,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
};

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// set function
function onFormInput() {
  const countryName = refs.input.value.trim();
  if (countryName.length > 0) {
    fetchCountries(countryName).then(showCountries).catch(handleError);
  } else {
    clearResultOutput();
  }
}

function showCountries(countriesData) {
  if (countriesData.length > 10) {
    clearResultOutput();
    Notify.info(infoMessage, notifyOptions);
  }
  if (countriesData.length > 1 && countriesData.length <= 10) {
    clearResultOutput();
    showCountriesList(countriesData);
  }
  if (countriesData.length === 1) {
    clearResultOutput();
    showCountryInfo(countriesData);
  }
}

// render one country, which satisfy the request
function showCountryInfo(countriesData) {
  const receivedItem = getData(countriesData);
  const { capital, name, population, flagSrc, languages } = receivedItem[0];
  refs.outputCountryInfo.innerHTML = `<div class="country-name__wrapper">
      <img class="country-flag" src="${flagSrc}" alt="flag of the country ${name}">
      <h1 class="country-name">${name}</h1>
    </div><p class="country-info__text"><b>Capital: </b>${capital}</p>
    <p class="country-info__text"><b>Population: </b>${population}</p>
    <p class="country-info__text"><b>Languages: </b>${languages}</p>`;
}

// render list of the countries, which satisfy the request
function showCountriesList(countriesData) {
  const countriesList = getData(countriesData);
  refs.outputList.innerHTML = countriesList
    .map(
      ({
        flagSrc,
        name,
      }) => `<li class="country-list__item"><img class="country-flag--sm" src="${flagSrc}" alt="flag of the country ${name}" />
      <p class="country-name--sm">${name}</p></li>`
    )
    .join('');
}

// receive necessary data from backend's fetch
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

function clearResultOutput() {
  refs.outputCountryInfo.innerHTML = '';
  refs.outputList.innerHTML = '';
}

function handleError(error) {
  clearResultOutput();
  Notify.failure(errorMessage, notifyOptions);
}
