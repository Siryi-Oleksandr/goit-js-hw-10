export function fetchCountries(name) {
  console.log(name);

  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

// https://restcountries.com/v2/all?fields=name,capital,currencies

// https://restcountries.com/v3.1/name/${name}
