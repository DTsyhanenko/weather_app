import getWeather from "./weather-http.service.js"

const container = document.querySelector(".form-container")
const currentWeather = document.querySelector(".current-section")
const ICON_URL = "https://openweathermap.org/img/wn/"
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const date = new Date()

async function showWeather(value) {
  const data = await getWeather(value, "metric")
  console.log(data)

  const cityName = document.querySelector(".selected")
  cityName.innerText = "Selected city: " + data.city.name

  const weatherDescrition = document.querySelector(".description")
  weatherDescrition.innerText = data.list[0].weather[0].main

  const tempCelcius = document.querySelector(".celsius")
  tempCelcius.innerText = Math.round(data.list[0].main.temp) + " °C"

  const clouds = document.querySelector(".clouds")
  clouds.innerText = "Clouds: " + data.list[0].clouds.all + " %"

  const currentIcon = data.list[0].weather[0].icon

  getIcon(currentIcon, ".png")

  function getIcon(icon, format) {
    const currentWeatherIcon = document.getElementById("current-weather-icon")
    currentWeatherIcon.setAttribute("src", ICON_URL + icon + format)
  }

  currentWeather.classList.add("show")

  /*Weekly forecast*/

  for (let i = 0; i < 5; i++) {
    let nextDays = date.setDate(date.getDate() + 1)
    const currentDay = days[date.getDay(nextDays)]
    let weatherForecast = `
          <div class="week">
            <p class="week-day">${currentDay}</p>
            <img class="weather-icon" src="./assets/sun-clouds.png" alt="">
            <p class="weather-description">Sunny, Cloudly</p>
            <div class="day-night-temp">
              <div class="day">
                <p class="day-time">Day</p>
                <p class="daily-temp">4°C</p>
              </div>
              <div class="night">
                <p class="daily-temp">1°C</p>
                <p class="day-time">Night</p>
              </div>
          </div>
        `
    container.insertAdjacentHTML("beforeend", weatherForecast)
  }
}

export default showWeather
