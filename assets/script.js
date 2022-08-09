// TODO - STEP 1: DECLARING VARIABLES
// API info: api key, geo request, and weather request
const APIKey = "bb7304f084ceb5e9b27c6996241d67e5";
const geocodingRequest = "https://api.openweathermap.org/geo/1.0/direct";
const weatherRequest = "https://api.openweathermap.org/data/2.5/onecall";

// Page Elements
let citiesArray = []; //data is collected here
const searchBtn = $("#search-btn"); //main button
const cityInputEl = $("#cityInput"); //user's search
const previousSearchesEl = $("#previous-searches"); //list of searched cities
const displayCityEl = $("#displayCity"); //displaying searched cities
const currentWeatherEl = $("#current-weather"); //display current weather
const forecastEl = $("#forecast-five");

init(); //initializes the app with values in localStorage

// TODO - STEP 2: ADDING FUNCTIONALITY TO SEARCH-BTN
// Button works when clicked, and if no input is entered, display an error message
searchBtn.on("click", function (event) {
  event.preventDefault;
  // if user doesn't enter any city name
  if (cityInputEl === "") {
    cityInputEl.attr("placeholder", "Please enter a city");
    return; //stops code from keep running
  }

  // Let's be fancy and format the string so that the first letter of the city searched is uppercase, while the rest is lowecase
  let str = formatInput(cityInputEl.val());
  // Adding a new btn that holds value of newly searched city
  appendNewButton(str);
  //sending a request for geo location
  webRequest(cityInputEl.val());
  // Clearing value from the city input area
  cityInputEl.val("");
});

// TODO - STEP 3: MAKE PREVIOUS SEARCHES BTN CLICKABLE
previousSearchesEl.on("click", ".btn", btnClick);

// TODO - STEP 4: ADD PREVIOUS SEARCHES TO LOCAL STORAGE so users can revisit them as needed
function init() {
  // grab local storage array, else --> assign variable to an empty array
  let localSto = JSON.parse(localStorage.getItem("priorSearch")) || citiesArray;
  console.log(localSto);
  for (let i = 0; i < localSto.length; i++) {
    // appending a new btn for every index in localSto
    previousSearchesEl.append(
      '<button class="btn bg-light-gray">' + localSto[i] + "</button>"
    );
  }
}

function btnClick(event) {
  event.preventDefault();
  // sending web request accordingly to button's text
  webRequest($(this).text());
}

// TODO - STEP 5: FETCHING: Getting latitude and longitude coordinates for inputted city
function webRequest(cityName) {
  let geoRequestURL = geoRequest + "?q=" + cityName + "&appid=" + APIKey;
  // getting the latitute and longitude of the city the user searches
  fetch(geoRequestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data[0].lat, data[0].lon);
      // Getting today's date
      let today = moment().format("M/D/YYYY");
      displayCityEl
        .find("h3")
        .text(data[0].name + ", " + container + " (" + today + ")");
      getWeather(data);
    });
}

// TODO - STEP 6: GET WEATHER INFO FOR SEARCHED CITY
function getWeather(geoCoordinates) {
  // Using latitude and longitude to find city
  let weatherRequestURL =
    weatherRequest +
    "?lat=" +
    geoCoordinates[0].lat +
    "&lon=" +
    geoCoordinates[0].lon +
    "&units=imperial&appid=" +
    APIKey;
  fetch(weatherRequestURL)
    .then(function (response) {
      //sends a request for weather using the received lat and lon
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // display weather icon next to cityName and today's date
      let icon = data.current.weather[0].icon;
      displayCityEl
        .children()
        .eq(1)
        .attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
      // DISPLAYING CURRENT WEATHER
      displayCityEl.children().eq(1).attr("alt", data.current.weather[0].main);

      displayCityEl
        .children()
        .eq(2)
        // this will display today's T°
        .text("Temp: " + data.current.temp + "°F");

      displayCityEl
        .children()
        .eq(3)
        // this will display today's wind speed
        .text("Wind: " + data.current.wind_speed + " MPH");

      displayCityEl
        .children()
        .eq(4)
        // this will display today's humidty
        .text("Humidity: " + data.current.humidity + "%");

      // TODO - STEP 7: SET UV INDEX BACKGROUND COLOR ACCORDINGLY
      indexScale(data.current.uvi);
      // this will display today's UV-index
      displayCityEl.children().eq(5).children().text(data.current.uvi);
      // Populates 5-day forecast
      renderForecast(data);
      // We remove CSS hide class, so it can be displayed on the screen
      currentWeatherEl.removeClass("hide");
    });
}

function indexScale(rating) {
  let indexColor = displayCityEl.children().eq(4).children();
  // //removes any of the coloring that the index would have had
  // indexColor.removeClass("minimal");
  // indexColor.removeClass("low");
  // indexColor.removeClass("moderate");
  // indexColor.removeClass("high");
  // Adding correct color based on uv index rating
  if (rating < 2) {
    indexColor.addClass("low");
  } else if (3 < rating < 5) {
    indexColor.addClass("moderate");
  } else if (6 < rating < 7) {
    indexColor.addClass("high");
  } else {
    indexColor.addClass("very-high");
  }
}

// STEP 3: FUNCITONALITY FOR PREVIOUSLY SEARCHED CITIES (BUTONS)
// searchedCityEl.on("click", ".searchBtn", btnClick);

// function init() {
//   //pulling local storage array, else assign variable to an empty array
//   const searchHistory =
//     JSON.parse(localStorage.getItem("priorSearch")) || citiesArray; //citiesArray is an empty array
//   for (let i = 0; i < searchHistory.length; i++) {
//     searchedCityEl.append(
//       '<button class="btn bg-light-gray">' + searchHistory[i] + "</button>"
//     );
//     //adding a button for every searched city
//     searchHistory.push({
//       priorSearch: searchedCityEl.textContent,
//     }); // adds the new list item to the list in localStorage
//     localStorage.setItem("priorSearch", JSON.stringify(searchHistory)); // updates localStorage
//   }
// }

// function btnClick(event) {
//   event.preventDefault();
//   webRequest($(this).text()); // sending a web request based on the button's text
// }

// eq(index) reduces set of matched elements to the specified index
// using console to pull data for each element
// displayCityEl.children().eq(1).attr("alt", data.current.weather[0].main);
// displayCityEl
//   .children()
//   .eq(2)
//   .text("Temperature: " + data.current.temp + "°F"); //
// displayCityEl
//   .children()
//   .eq(3)
//   .text("Wind Speed: " + data.current.wind_speed + " MPH");
// displayCityEl
//   .children()
//   .eq(4)
//   .text("Humidity: " + data.current.humidity + "%");
// forecast5Days(data); // calls 5-day forecast

//Accessing UV Index Info

//       function uvIndex(scale) {
//         let index = displayCityEl.children().eq(4).children();
//         index.removeClass("low");
//         index.removeClass("moderate");
//         index.removeClass("high");
//         index.remove("very-high");
//         // Then we want to add desired color to each UV index based on the scale
//         if (scale <= 2) {
//           index.addClass("low");
//         } else if (scale <= 3) {
//           index.addClass("moderate");
//         } else if (scale <= 7) {
//           index.addClass("high");
//         } else {
//           index.addClass("very-high");
//         }
//       }

// uvIndex();

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
