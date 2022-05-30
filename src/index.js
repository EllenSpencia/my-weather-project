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

//function faren() {
//let farenheit = document.querySelector("#main-temper");
//farenheit.innerHTML = `66°`;
//}
//let rightUnit = document.querySelector("#f-sym");
//rightUnit.addEventListener("click", faren);

//function celsius() {
//let cels = document.querySelector("#main-temper");
//cels.innerHTML = `11°`;
//}
//let leftUnit = document.querySelector("#c-sym");
//leftUnit.addEventListener("click", celsius);
