import getWeather from "./weather-http.service.js"

const container = document.querySelector(".form-container")
const currentWeather = document.querySelector(".current-section")
const ICON_URL = "https://openweathermap.org/img/wn/"

async function showWeather(value) {
  const data = await getWeather(value, "metric")
  const forecastData = data.list
  console.log(data)

  const cityName = document.querySelector(".selected")
  cityName.innerText = "Selected city: " + data.city.name

  const weatherDescrition = document.querySelector(".description")
  weatherDescrition.innerText = forecastData[0].weather[0].main

  const tempCelcius = document.querySelector(".celsius")
  tempCelcius.innerText = Math.round(forecastData[0].main.temp) + " °C"

  const clouds = document.querySelector(".clouds")
  clouds.innerText = "Clouds: " + forecastData[0].clouds.all + " %"

  const currentIcon = forecastData[0].weather[0].icon

  getIcon(currentIcon, ".png")

  function getIcon(icon, format) {
    const currentWeatherIcon = document.getElementById("current-weather-icon")
    currentWeatherIcon.setAttribute("src", ICON_URL + icon + format)
  }

  currentWeather.classList.add("show")

  /*Weekly forecast*/

  forecastData.forEach((forecast) => {
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
    const timeFromForecast = new Date(forecast.dt_txt)
    const dayHours = timeFromForecast.getHours()

    const tempMax = Math.round(forecast.main.temp_max)
    const tempMin = Math.round(forecast.main.temp_min)

    /* getMaxTemp()
    getMinTemp()

    function getMaxTemp() {
      if (dayHours === 9) {
        return Math.round(forecast.main.temp_max)
      }
    }

    function getMinTemp() {
      if (dayHours === 21) {
        return Math.round(forecast.main.temp_min)
      }
    } */

    getDayNamesFromForecast()

    function getDayNamesFromForecast() {
      if (dayHours === 12) {
        const dayFromForecast = dayNames[timeFromForecast.getDay()]

        const forecastWeatherIcon = forecast.weather[0].icon
        const forecastWeatherDescription = forecast.weather[0].main

        let weatherForecast = `
          <div class="week">
            <p class="week-day">${dayFromForecast}</p>
            <img class="weather-icon" src="${
              ICON_URL + forecastWeatherIcon + ".png"
            }" alt="">
            <p class="weather-description">${forecastWeatherDescription}</p>
            <div class="day-night-temp">
              <div class="day">
                <p class="day-time">Day</p>
                <p class="daily-temp">${tempMax} °C</p>
              </div>
              <div class="night">
                <p class="daily-temp">${tempMin} °C</p>
                <p class="day-time">Night</p>
              </div>
          </div>
        `
        container.insertAdjacentHTML("beforeend", weatherForecast)
      }
    }
  })
}

export default showWeather
