// TODO - STEP 1: DECLARING VARIABLES
const APIKey = "bb7304f084ceb5e9b27c6996241d67e5";

let citiesArray = []; //data is collected here
const searchBtn = $("#search-btn"); //main button
const cityInputEl = $("#cityInput"); //user's search
const previousSearchesEl = $("#previous-searches"); //list of searched cities
const displayCityEl = $("#displayCity"); //displaying searched cities
const currentWeatherEl = $("#current-weather");
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

// // STEP 2: STORE SEARCHED CITIES
// function storeCities() {
//   citiesArray.push(cityInputEl.val);
//   localStorage.setItem("searched-city", JSON.stringify(citiesArray));
//   displayCurrent(cityInputEl.val);
//   displaySearchedCities();
//   displayForecast(data);
// }

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

// // STEP 4: DISPLAY PREVIOUSLY SEARCHED CITIES ON PAGE
// function displaySearchedCities() {
//   searchedCityEl.innerHTML = "";
//   if (localStorage.getItem("searched-city")) {
//     for (let i = 0; i < citiesArray.length; i++) {
//       let cityEl = document.createElement("li");
//       cityEl.textContent = citiesArray[i];
//       searchedCityEl.appendChild(cityEl);
//     }
//   }
// }
// displaySearchedCities();

// // STEP 4: DISPLAY CURRENT WEATHER INFO
// function displayCurrent(cityInput) {
//   const todayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${APIKey}&exclude=hourly,minutely,alerts&units=imperial`;
//   fetch(todayURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);

//       document.getElementById("cityName").innerHTML = data.city.name;
//       document.getElementById("current-date").innerHTML = moment
//         .unix(data.list[0].dt)
//         .format("MM/DD/YYYY");
//       document.getElementById("temp-today").innerHTML = data.list[0].main.temp;
//       document.getElementById("wind-today").innerHTML = data.list[0].wind.speed;
//       document.getElementById("humid-today").innerHTML =
//         data.list[0].main.humidity;
//       let weatherIconId = data.list[0].weather[0].icon; //icon current day
//       let iconURL =
//         "http://openweathermap.org/img/wn/" + weatherIconId + "@2x.png";
//       document.getElementById("cityIcon").setAttribute("src", iconURL);

//       // STEP 5: DISPLAY 5-DAY FORECAST
//       function displayForecast(data) {
//         //loops through the data to display a 5-day forecast
//         for (let i = 0; i < 5; i++) {
//           let day = forecast.children().eq(i); // moves through the different divs
//           let iconDaily = data.daily[i].weather[0].icon; // gets the icon of the indexed day
//           day
//             .children()
//             .eq(0)
//             .text(
//               moment()
//                 .add(i + 1, "days")
//                 .format("M/D/YYYY")
//             ); // date of the respective index
//           day
//             .children()
//             .eq(1)
//             .attr(
//               "src",
//               "http://openweathermap.org/img/wn/" + iconDaily + ".png"
//             ); //icon for the indexed day
//           // day.children().eq(1).attr('alt',data.daily[i].weather[0].main); //sets the alt text of the icon to be more descriptive
//           day
//             .children()
//             .eq(2)
//             .text("Temperature: " + data.daily[i].temp.day + "°F"); //temperature
//           day
//             .children()
//             .eq(3)
//             .text("Wind Speed: " + data.daily[i].wind_speed + " MPH"); //wind speed
//           day
//             .children()
//             .eq(4)
//             .text("Humidity: " + data.daily[i].humidity + "%"); // humidity
//         }
//       }
//     });
// }
// displayCurrent();

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
