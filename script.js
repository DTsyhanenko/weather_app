const container = document.querySelector(".form-container")
const form = document.getElementById("form")
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const date = new Date()

form.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    e.preventDefault()

    const API_CALL = `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&appid=28a377ca6ef3c6e32b3f3f51588ebb85&units=metric`
    getWeather()
    e.target.value = ""

    async function getWeather() {
      try {
        const res = await fetch(API_CALL)
        const data = await res.json()
        const dataList = data.list
        console.log(dataList)

        const cityName = data.city.name
        const weatherDescrition = data.list[0].weather[0].main
        const tempCelcius = Math.round(data.list[0].main.temp)
        const clouds = data.list[0].clouds.all

        const weatherInfos = `
            <p id="selected">Selected city: ${cityName}</p>
            <div class="weather-info">
              <div id="current">
                <div class="weather-data temp">
                  <p class="celsius">${tempCelcius}°C</p>
                  <p>${weatherDescrition}</p>
                </div>
                <div class="weather-data city">
                  <p>Clouds: ${clouds} %</p>
                  <p>${cityName}</p>
                </div>
                <div class="weather-data icons">
                  <img class="weather-icon" src="./assets/rain.png" alt="Cloud with rain">
                </div>
              </div>
            </div>
          `
        container.insertAdjacentHTML("beforeend", weatherInfos)

        for (let i = 0; i < 5; i++) {
          const nextDays = date.setDate(date.getDate() + 1)
          const currentDay = days[date.getDay(nextDays)]
          const weatherForecast = `
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
      } catch (err) {
        console.log(err)
        /* alert("An error ocurred!") */
      }
    }
  }
})
