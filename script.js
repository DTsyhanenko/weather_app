const form = document.getElementById("form")
const WEATHER_API_CALL =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=28a377ca6ef3c6e32b3f3f51588ebb85"

form.addEventListener("keypress", (e) => {
  if (e.key != "Enter" || e.target.value === "") {
    return
  } else {
    e.preventDefault()
    e.target.value = ""
    getWeather()
  }
})

async function getWeather() {
  const res = await fetch(WEATHER_API_CALL)
  const weather = await res.json()
  console.log(weather)
}
