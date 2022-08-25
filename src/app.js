function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours > 12) {
    hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 0) {
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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#current-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#current-date");

  let iconElement = document.querySelector("#icon");

  celsiusLink.classList.remove("active");
  fahrenehitLink.classList.add("active");

  console.log(response.data.main.temp);
  tempF = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(tempF);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", "response.data.weather[0].description");
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
  fahrenehitLink.classList.add("active");
}

function displayTempC(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  let tempC = ((tempF - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(tempC);

  celsiusLink.classList.add("active");
  fahrenehitLink.classList.remove("active");
}

let tempF = null;

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", handleSubmit);

let fahrenehitLink = document.querySelector("#fahrenheit-link");
fahrenehitLink.addEventListener("click", displayTempF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayTempC);

search("Seattle");
