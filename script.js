
const API_KEY = "931ded8a221e698de2c37817a58113e6";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorDiv = document.getElementById("error");
const card = document.getElementById("weather-card");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const desc = document.getElementById("description");
const icon = document.getElementById("icon");
const extra = document.getElementById("extra");

async function getWeather(city) {
  errorDiv.textContent = "";
  card.classList.add("hidden");

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    return;
  }

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("City not found. Try again.");
    }

    const data = await res.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `Temperature: ${data.main.temp} °C`;
    desc.textContent =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);

    const iconCode = data.weather[0].icon;
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    extra.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;
    card.classList.remove("hidden");
  } catch (err) {
    errorDiv.textContent = err.message;
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    getWeather(city);
  }
});
