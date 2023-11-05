// Feature 1
// In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();

// Day of the Week
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = now.getDay();
let currentDay = days[now.getDay()];

// Time
let hour = now.getHours();

let minutes = String(now.getMinutes()).padStart(2, "0");
console.log(minutes);

let currentTime = `${hour}:${minutes}`;
console.log(currentTime);

// Current day and time on h2
let dateTime = document.querySelector("h2");
console.log(dateTime);

dateTime.innerHTML = `${currentDay}, ${currentTime}`;

// Feature 2
// Add a search engine: a search bar with a button. When searching for a city (i.e. Paris),
// display the city name on the page after the user submits the form.

function showTemperature(response) {
  console.log(response.data.main.temp);

  let temperatureCity = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#degree-number");

  temperatureElement.innerHTML = `${temperatureCity}`;

  function degreesFahrenheit(event) {
    event.preventDefault();
    let degreeNumber = document.querySelector("#degree-number");
    degreeNumber.innerHTML = Math.round(response.data.main.temp * 1.8 + 32);

    let fahrenheitClass = document.querySelector(".fahrenheit");
    fahrenheitClass.classList.remove("fahrenheit");
    fahrenheitClass.classList.add("celsius");

    let celsiusClass = document.querySelector(".celsius");
    celsiusClass.classList.remove("celsius");
    celsiusClass.classList.add("fahrenheit");
  }

  function degreesCelsius(event) {
    event.preventDefault();
    let degreeNumber = document.querySelector("#degree-number");
    degreeNumber.innerHTML = `${temperatureCity}`;

    let celsiusClass = document.querySelector(".celsius");
    celsiusClass.classList.remove("celsius");
    celsiusClass.classList.add("fahrenheit");

    let fahrenheitClass = document.querySelector(".fahrenheit");
    fahrenheitClass.classList.remove("fahrenheit");
    fahrenheitClass.classList.add("celsius");
  }

  let fahrenheitDegrees = document.querySelector("#degree-fahrenheit");
  fahrenheitDegrees.addEventListener("click", degreesFahrenheit);

  let celsiusDegrees = document.querySelector("#degree-celsius");
  celsiusDegrees.addEventListener("click", degreesCelsius);

  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let feelsLikeText = document.querySelector("#feels-like");

  feelsLikeText.innerHTML = `${feelsLikeTemp}`;

  let windCity = Math.round((response.data.wind.speed * 3600) / 1000);
  let windElement = document.querySelector("#wind-speed");

  windElement.innerHTML = `${windCity}`;

  let humidityCity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-level");

  humidityElement.innerHTML = `${humidityCity}`;
}

function writeCity(event) {
  console.log("Hello");

  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let citySearch = document.querySelector("h1");

  citySearch.innerHTML = inputCity.value;

  let apiKey = `f09d3949047ab6c9e3bcaf79cf61f619`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", writeCity);

// Add a Current Location button. When clicking on it, it uses the Geolocation API to get
// your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function handlePosition(position) {
  let currentLatitude = position.coords.latitude;
  let currentLongitude = position.coords.longitude;

  let apiKey = `f09d3949047ab6c9e3bcaf79cf61f619`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);

  let apiUrlGeocode = `https://api.openweathermap.org/geo/1.0/reverse?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}`;
  axios.get(apiUrlGeocode).then(showCurrentLocation);
}

function showCurrentLocation(response) {
  let currentCityLocation = document.querySelector("h1");

  currentCityLocation.innerHTML = response.data[0].name;
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationSearch = document.querySelector("#current-location");
currentLocationSearch.addEventListener("click", getCurrentLocation);
