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

function searchCity(city) {
  let apiKey = "o523c31a2f220c8ate5394b887be36b3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(currentWeather);
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
  // Handle search form submit
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
