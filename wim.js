function currentWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML =
    Math.round(response.data.temperature.current) + "°C";
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

function getForecast(city) {
  let apiKey = "o523c31a2f220c8ate5394b887be36b3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°C</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°C</div>
          </div>
        </div>
      `;
    }
  });

  document.querySelector("#forecast").innerHTML = forecastHtml;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function searchCity(city) {
  let apiKey = "o523c31a2f220c8ate5394b887be36b3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentWeather);
  getForecast(city);
}

function displayCurrentDateTime() {
  let now = new Date();
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  let currentDateTime = now.toLocaleString("en-US", options);

  document.querySelector("#current-date-time").innerHTML = currentDateTime;
}

document.addEventListener("DOMContentLoaded", function () {
  function handleSearchSubmit(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-form-input").value;

    if (searchInput) {
      document.querySelector("#city").innerHTML = searchInput;
      searchCity(searchInput);
    }

    document.querySelector("#search-form-input").value = "";
  }

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

  searchCity("Mbombela");

  displayCurrentDateTime();
  setInterval(displayCurrentDateTime, 1000);
});
