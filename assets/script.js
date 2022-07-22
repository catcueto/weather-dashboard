//STEP 1: DECLARING VARIABLES
// https://api.openweathermap.org/data/3.0/onecall?lat=39.7990175&lon=-89.6439575&exclude=minute,hourly&appid=4b0c69127490d39234fa02799a1164fe
//APIs
const geoRequest = "https://api.openweathermap.org/geo/1.0/direct";
const weatherRequest =
  "https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly";
const APIKey = "4b0c69127490d39234fa02799a1164fe";

let citiesArray = []; //data is collected here
const searchBtn = $("#search-btn"); //main button
const cityInputEl = $("#cityInput"); //user's search
const searchedCityEl = $("#searched-city"); //list of searched cities
const displayCityEl = $("#displayCity"); //displaying searched cities
const currentWeatherEl = $("#current-weather");
const forecastEl = $("#forecast-five");

// STEP 2: ADDING FUNCTIONALITY TO SEARCH-BTN
//Button works when clicked, and if no input is entered, display an error message
searchBtn.on("click", function (event) {
  event.preventDefault;
  let cityName = cityInputEl.val();
  if (cityName === "") {
    cityInputEl.attr("placeholder", "Please enter a city");
    return; //stops code from keep running
  }
  console.log(cityName);
  getWeatherByName(cityName);
});

// STEP 3: FUNCITONALITY FOR PREVIOUSLY SEARCHED CITIES (BUTONS)
searchedCityEl.on("click", ".searchBtn", btnClick);

function starter() {
  //pulling local storage array, else assign variable to an empty array
  const searchHistory =
    JSON.parse(localStorage.getItem("priorSearch")) || citiesArray; //citiesArray is an empty array
  for (let i = 0; i < searchHistory.length; i++) {
    //adding a button for every element
    searchedCityEl.append(
      '<button class="btn bg-light-gray">' + searchHistory[i] + "</button>"
    );
  }
}

starter(); //initializes the app with values in localStorage

function btnClick(event) {
  event.preventDefault();
  webRequest($(this).text()); // sending a web request based on the button's text
}

// STEP 4: FETCHING COORDINATES INFO FROM API
function getWeatherByName(cityName) {
  const geoURL = `${geoRequest}?q=${cityName}&appid=${APIKey}`;

  fetch(geoURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat, data[0].lon);
      getWeatherByCoordinates(data[0].lat, data[0].lon);
      let today = moment().format("M/D/YYYY"); // using moment to get current date
      // If user doesn't input any state
      let stateCountry = data[0].state;
      //then display country
      if (stateCountry === undefined) stateCountry = data[0].country;

      displayCityEl
        .find("h3") //h3 refers to the city Name on HTML file
        .text(data[0].name + ", " + stateCountry + " " + today);
      getWeatherByCoordinates(data);
    });
}

function getWeatherByCoordinates(lat, lon) {
  let weatherURL = `${weatherRequest}&lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
  fetch(weatherURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      //Adding Weather Icon next to the city's name and today's date
      let weatherIcon = data.current.weather[0].icon;
      displayCityEl
        .children()
        .eq(1)
        .attr(
          "src",
          "http://openweathermap.org/img/wn/" + weatherIcon + ".png"
        );
      // eq(index) reduces set of matched elements to the specified index
      // using console to pull data for each element
      displayCityEl.children().eq(1).attr("alt", data.current.weather[0].main);
      displayCityEl
        .children()
        .eq(2)
        .text("Temperature: " + data.current.temp + "°F"); //
      displayCityEl
        .children()
        .eq(3)
        .text("Wind Speed: " + data.current.wind_speed + " MPH");
      displayCityEl
        .children()
        .eq(4)
        .text("Humidity: " + data.current.humidity + "%");
      indexUV(data.current.uvi); // sets the background color of the UV index
      displayCityEl.children().eq(5).children().text(data.current.uvi); // current UV index
      // forecast5Days(data); // calls 5-day forecast
      currentWeatherEl.remove("hideEl"); // allows the user display to be seen
    });
}

function indexUV(scale) {
  // We first want to get rid of any prexisting coloring for the UV index levels
  let index = displayCityEl.children().eq(4).children();
  index.removeClass("low");
  index.removeClass("moderate");
  index.removeClass("high");
  index.remove("very-high");
  // Then we want to add desired color to each UV index based on the scale
  if (scale <= 2) {
    index.addClass("low");
  } else if (scale <= 3) {
    index.addClass("moderate");
  } else if (scale <= 7) {
    index.addClass("high");
  } else {
    index.addClass("very-high");
  }
}

// localStorage.setItem(id, textInput);
// var retrievels = localStorage.getItem(id);
// console.log(retrievels);

// $(this).siblings("textarea").text(retrievels);
// getAPI();

// console.log(textInputEl);

// PSEUDOCODE

// STEP 1: Display Weather Dashbord at top of viewport (HTML, Bootstrap, CSS)
// STEP 2: Left-side bar (FORM) that allows the user to search for a city
// -- add search button --> event listener (click)
// STEP 3: Selected city is added to the search history (left-side)
/* STEP 4: When city is searched, then weather conditions are displayed (CURRENT & 5-DAY FORECAST)
        a) User can see city name, today's date, icon representation of weather conditions, temperature, humidity, wind speed, and UV index
        b) When user views UV index, this should be colored according to whether the conditions are favorable (green), moderate (orange), or severe (red)
        c) 5-day forecast IsNCLUDES same sections (date + icon representation + temp + wind + humidty */
//  STEP 5: When clicking on a city in search history, then user can see current and future conditions for selected city AGAIN
