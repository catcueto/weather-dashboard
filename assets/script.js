const APIKey = "4b0c69127490d39234fa02799a1164fe";
let citiesArray = []; //data is collected here
const currentWeather = document.getElementById("current-weather");

//STEP 1: SEARCH CITIES
const searchedCity = document.getElementById("searched-city"); //list of searched cities
const searchBtn = document.getElementById("search-btn");
clickID = 0; //on click button

searchBtn.addEventListener("click", function () {
  const textInput = document.getElementById("searchInput"); //cityinputEl
  displayList(textInput.value);
  cityArray.push(textInput.value); //push to add elements @ end of array
  localStorage.setItem(searchedCity, JSON.stringify(citiesArray)); //city input storage location
});

function displayList(cityInput) {
  const APIWeather = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${APIKey}&exclude=hourly,minutely,alerts&units=imperial&limit=1`;
  //api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
  https: console.log(cityInput);
  console.log(APIWeather);

  fetch(APIWeather)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

// //STEP 2: STORE CITIES
// function cityStore() {}

// dislayCity();

// PSEUDOCODE

// STEP 1: Display Weather Dashbord at top of viewport
// STEP 2: Left-side bar (FORM) that allows the user to search for a city
// STEP 3: Selected city is added to the search history (left-side)
/* STEP 4: When city is searched, then weather conditions are displayed (CURRENT & 5-DAY FORECAST)
        a) User can see city name, today's date, icon representation of weather conditions, temperature, humidity, wind speed, and UV index
        b) When user views UV index, this should be colored according to whether the conditions are favorable (green), moderate (orange), or severe (red)
        c) 5-day forecast IsNCLUDES same sections (date + icon representation + temp + wind + humidty */
//  STEP 5: When clicking on a city in search history, then user can see current and future conditions for selected city AGAIN
