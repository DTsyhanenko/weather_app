const container = document.querySelector(".form-container")
const form = document.getElementById("form")

form.addEventListener("keypress", (e) => {
  if (e.key != "Enter" || e.target.value === "") {
    return
  } else {
    e.preventDefault()
    const API_CALL = `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=28a377ca6ef3c6e32b3f3f51588ebb85`
    getWeather()
    e.target.value = ""

    async function getWeather() {
      const res = await fetch(API_CALL)
      const data = await res.json()
      const cityName = data.name
      const weatherDescrition = data.weather[0].main
      const tempCelcius = Math.round(data.main.temp - 273)
      const clouds = data.clouds.all

      console.log(data)

      const weatherInfos = `
      <p id="selected">Selected city: ${cityName}</p>
      <div class="weather-info">
          <div id="current">
              <div class="weather-data temp">
                  <p class="celsius">${tempCelcius} °C</p>
                  <p>${weatherDescrition}</p>
              </div>
              <div class="weather-data city">
                  <p>Clouds ${clouds}%</p>
                  <p>${cityName}, ${data.sys.country}</p>
              </div>
              <div class="weather-data icons">
                  <img class="weather-icon" src="./src/rain.png" alt="Cloud with rain">
              </div>
          </div>
          <div id="week"></div>
      </div>
      `
      container.insertAdjacentHTML("beforeend", weatherInfos)
    }
  }
})
