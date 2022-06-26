let date = new Date();
let currentDate = date.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[date.getDay()];
let currentHour = date.getHours();
let currentMinutes = date.getMinutes();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[date.getMonth()];
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col sym">
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
               
              <div class="icons">
                <img class="weather"
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                />
              </div>
              ${Math.round(forecastDay.temp.day)}°
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let newDay = document.querySelector("#day");
newDay.innerHTML = `${currentDay} ${currentDate}. ${currentMonth} <br /> ${currentHour}:${currentMinutes}`;

function searchEngine(event) {
  event.preventDefault();
  let input = document.querySelector("#searchInput");
  let city = document.querySelector("#city");
  city.innerHTML = `${input.value}`;
  searchCity(input.value);
}
function searchCity(city) {
  let apiKey = "893bb34b6d15090daae952066e9d9eb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "893bb34b6d15090daae952066e9d9eb4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  console.log(response);
  let currentTemp = Math.round(response.data.main.temp);
  let todayTemp = document.querySelector("#main-temper");
  todayTemp.innerHTML = `${currentTemp}`;
  let searchCityName = document.querySelector("#city");
  searchCityName.innerHTML = `${response.data.name}`;
  let humidityD = document.querySelector("#humidity");
  humidityD.innerHTML = `${response.data.main.humidity}%`;
  let cloudsD = document.querySelector("#cloud");
  cloudsD.innerHTML = `${response.data.clouds.all}%`;
  let windD = document.querySelector("#wind");
  windD.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  let generalW = document.querySelector("#general");
  generalW.innerHTML = Math.round(response.data.main.feels_like) + " °";
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = Math.round(response.data.main.temp);
  getForecast(response.data.coord);
}
let searchClick = document.querySelector("form");
searchClick.addEventListener("submit", searchEngine, showWeather);

function handlePosition(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=893bb34b6d15090daae952066e9d9eb4`;
  axios.get(apiUrl).then(showWeather);
}
function currLocationSearch(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let searchCurrentLoc = document.querySelector("#current-loc");
searchCurrentLoc.addEventListener("click", currLocationSearch);
let celsiusTemperature = null;
searchCity("Helsinki");
