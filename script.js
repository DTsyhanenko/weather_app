const form = document.getElementById("form")

form.addEventListener("keypress", (e) => {
  if (e.key != "Enter" || e.target.value === "") {
    return
  } else {
    e.preventDefault()
    let input = e.target.value
    const API_CALL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=28a377ca6ef3c6e32b3f3f51588ebb85`
    getWeather()

    input = ""

    async function getWeather() {
      const res = await fetch(API_CALL)
      const weather = await res.json()
      console.log(weather)
    }
  }
})
