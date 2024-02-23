import showWeather from "./fetch.js"

const form = document.getElementById("form")
const currentWeather = document.querySelector(".current-section")

form.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value !== "") {
    e.preventDefault()
    if (currentWeather.classList.contains("show")) {
      currentWeather.classList.remove("show")
    }

    if (document.querySelectorAll(".week")) {
      document.querySelectorAll(".week").forEach((week) => {
        week.remove()
      })
    }

    showWeather(e.target.value)
    e.target.value = ""
  }
})
