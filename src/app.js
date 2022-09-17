function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2">
            <div class="forecast-day">${formatDay(forecastDay.dt)}
            </div>
            
            <img 
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" 
              alt=""
              width=50 
            />
            <div class="forecast-degrees">
              <span class="forecast-temp-high">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-temp-low"> ${Math.round(
                forecastDay.temp.min
              )}°</span> 
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "a5acb752426cd8188485c35694980e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");

  tempF = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(tempF);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].description");

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "eee5ee31d243367da9788e9b7ef6d18f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayTempF(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(tempF);

  celsiusLink.classList.remove("active");
  fahrLink.classList.add("active");
}

function displayTempC(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  let tempC = ((tempF - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(tempC);

  celsiusLink.classList.add("active");
  fahrLink.classList.remove("active");
}

let tempF = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

search("Seattle");
