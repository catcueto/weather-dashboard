//APIs
const geoRequest = "https://api.openweathermap.org/geo/1.0/direct";
const weatherRequest = "https://api.openweathermap.org/data/2.5/onecall";
const APIKey = "4b0c69127490d39234fa02799a1164fe";

//DECLARING VARIABLES
let citiesArray = []; //data is collected here
const currentWeather = document.getElementById("weather-today");

//STEP 1: SEARCH CITIES
const searchedCityEl = document.getElementById("searched-city"); //list of searched cities
const searchBtn = document.getElementById("search-btn");

clickID = 0; //on click button

// STEP 2: STORE CITIES: Search button functionality + storing cities in local storage
searchBtn.addEventListener("click", function (event) {
  event.preventDefault;
  console.log(searchBtn);
  const textInput = document.getElementById("searchInput"); //cityinputEl

  localStorage.setItem(searchedCityEl, JSON.stringify(citiesArray)); //city input storage location
  displayList();
});

// Fetching city info from weather api
function displayList() {
  let weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=Virginia&appid=${APIKey}&exclude=hourly,minutely,alerts&units=imperial`;

  fetch(weatherURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      //STEP 3: CREATING & DISPLAYING ELEMENTS ON PAGE
      //div container
      const divEl = document.createElement("div");
      divEl.className = "container";

      // City name
      const title = document.createElement("h1");
      title.textContent = data.city.name; //retrieving city name

      //Current Day
      const currentTime = document.createElement("p");
      currentTime.textContent = moment
        .unix(data.list[0].dt)
        .format("MM/DD/YYYY");

      // Current T°
      const temp = document.createElement("p");
      temp.textContent = `Temperature: ${data.list[0].main.temp} °F, feels like ${data.list[0].main.feels_like} °F`;

      // Current Humidity
      const humidity = document.createElement("p");
      humidity.textContent = `Humidity: ${data.list[0].main.humidity} %`;

      // Wind Speed
      const windSpeed = document.createElement("p");
      windSpeed.textContent = `Wind Speed: ${data.list[0].wind.speed} mph`;

      //Icons according to weather
      const iconID = data.list[0].weather[0].icon;
      const iconURl = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
      const icon = document.createElement("img");
      icon.setAttribute("src", iconURl);
      divEl.append(title, currentTime, temp, humidity, windSpeed, icon);
      currentWeather.append(divEl);
    });
}

searchedCityEl.innerHTML = "";
const id = clickID;
clickID++; //adding one at every click

const textInputEl = $(this).siblings("citySearch").val;

citiesArray.push(textInputEl); //push to add elements @ end of array
citiesArray.forEach((cityName) => {
  searchBtn.setAttribute("", cityName); //value?
  searchBtn.textContent = cityName;
  searchedCityEl.append(searchBtn);
});

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
