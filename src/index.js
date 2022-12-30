import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 1000;

const refs = {
  input: document.querySelector('#search-box'),
  outputList: document.querySelector('.country-list'),
  outputCountryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

// set function
function onFormInput() {
  const countryName = refs.input.value;
  fetchCountries(countryName).then(showCountry).catch(handleError);
}

function fetchCountries(name) {
  console.log(name);

  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function showCountry(countryData) {
  console.log(countryData);

  countryData.forEach(elem => {
    console.log('Capital', elem.capital.join(', '));
    console.log(elem.population);
    console.log(elem.languages);
    console.log(elem.name.official);
  });
}

function handleError(error) {
  console.error('YOYOYO', error);
}

function receiveData(countryData) {
  const receivedData = {};
  countryData.forEach(elem => {
    receivedData.capital = elem.capital.join(',');
    receivedData.name = elem.name.official;
    receivedData.population = elem.population;
    receivedData.flag = elem.population;
    // console.log(elem.capital);
    // console.log(elem.name.official);
    console.log('flags', elem.flags.svg);
    // console.log(elem.languages);
  });
}

/* 
<div class="country-name__wrapper">
      <img class="country-flag" src="" alt="">
      <h1 class="country-name"></h1>
    </div>
    <p class="subtitle">Capital: <span class="subtitle__value"></span></p>
    <p class="subtitle">Population: <span class="subtitle__value"></span></p>
    <p class="subtitle">Languages: <span class="subtitle__value"></span></p>
*/

// ukraine
// united
// tanzan
// South Africa

/* 
name.official - повна назва країни
capital - столиця
population - населення
flags.svg - посилання на зображення прапора
languages - масив мов
*/
