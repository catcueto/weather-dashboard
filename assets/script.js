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
  let geoRequestURL = geocodingRequest + "?q=" + cityName + "&appid=" + APIKey;
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
      displayCityEl.find("h3").text(data[0].name + ", " + " (" + today + ")");
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

// TODO - STEP 8: CREATE FUNCTION TO FORMAT INPUT OF CITY SEARCHED

function formatInput(str) {
  // split() will separate name into individual words
  let words = str.split(" ");
  let output = "";
  console.log(words);
  // loops through the words and formats each one into Aaaaa
  for (let i = 0; i < words.length; i++) {
    console.log(words[i]);
    words[i] =
      words[i].substring(0, 1).toUpperCase() +
      words[i].substring(1, words[i].length).toLowerCase();
    // output = output + words[i], here we are concatenating/linking indexes into one array
    output += words[i] + " ";
    console.log(words[i]);
  }
  // trim method gets rid of spaces before or after; output = concatenated string
  return output.trim();
}

function appendNewButton(str) {
  // iterate thru button's list
  // if current search is already in list, stop function
  for (let i = 0; i < previousSearchesEl.children().length; i++) {
    if (previousSearchesEl.children().eq(i).text() === str) return;
  }
  // appending new btn to the ul
  previousSearchesEl.append(
    '<button class="btn bg-light-gray">' + str + "</button>"
  );
  const localSto =
    JSON.parse(localStorage.getItem("priorSearch")) || citiesArray; // gets the localStorage data
  // we push to add list in lS
  localSto.push(str);
  // updating localStorage
  localStorage.setItem("pastSearches", JSON.stringify(localSto));
}

function renderForecast(data) {
  // Create a for loop that iterates through the data so we can display a 5-day forecast
  for (let i = 0; i < 5; i++) {
    let day = forecastEl.children().eq(i);
    // rendering weather icon for indexed day
    let icon = data.daily[i].weather[0].icon;
    day
      .children()
      .eq(0)
      .text(
        moment()
          .add(i + 1, "days")
          .format("M/D/YYYY")
      ); // display the date of the respective index
    day
      .children()
      .eq(1)
      .attr("src", "http://openweathermap.org/img/wn/" + icon + ".png"); // gets the icon for the indexed day
    day.children().eq(1).attr("alt", data.daily[i].weather[0].main); // sets the alt text of the icon to be more descriptive
    day
      .children()
      .eq(2)
      .text("Temp: " + data.daily[i].temp.day + "°F"); // displays the temperature of the indexed day
    day
      .children()
      .eq(3)
      .text("Wind: " + data.daily[i].wind_speed + " MPH"); // displays the wind speed of the indexed day
    day
      .children()
      .eq(4)
      .text("Humidity: " + data.daily[i].humidity + "%"); // displays the humidity of the indexed day
  }
}
