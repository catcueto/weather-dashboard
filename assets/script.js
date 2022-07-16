//Find weather API
const APIkey = "f231ac68ebcc12d2f0f6924e17016a6c"; // declaring APIkey
let cityArray = []; //data is collected here

const searchedCity = document.getElementById("searched-city");

//STORING CITIES
function cityStore() {}
const cityInputEl = document.getElementById("searchInput");
cityArray.push(cityInputEl.val); //push to add elements @ end of array

localStorage.setItem(searchedCity, JSON.stringify(cityArray)); //city input  storage location
console.log(cityArray);
// displayResultEl(cityInputEl.value); //display list
// displayCity();

let index = 0; // creating a global for index

// const coordinates = (cityName) => {
//   fetch(
//     `https://api.openweathermap.org/data/3.0/weather?q=${cityName}&appid=${APIkey}exclude=hourly,daily`
//   )
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };

//Declaring variables for each section
// const locateCity = document.getElementById("search-btn");
//     }
// PSEUDOCODE

// STEP 1: Display Weather Dashbord at top of viewport
// STEP 2: Left-side bar (FORM) that allows the user to search for a city
// STEP 3: Selected city is added to the search history (left-side)
/* STEP 4: When city is searched, then weather conditions are displayed (CURRENT & 5-DAY FORECAST)
        a) User can see city name, today's date, icon representation of weather conditions, temperature, humidity, wind speed, and UV index 
        b) When user views UV index, this should be colored according to whether the conditions are favorable (green), moderate (orange), or severe (red)
        c) 5-day forecast IsNCLUDES same sections (date + icon representation + temp + wind + humidty */
//  STEP 5: When clicking on a city in search history, then user can see current and future conditions for selected city AGAIN
