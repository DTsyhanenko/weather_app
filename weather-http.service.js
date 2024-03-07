const API_URL = "https://api.openweathermap.org/"
const API_KEY = "28a377ca6ef3c6e32b3f3f51588ebb85"

async function getWeather(city, units) {
  try {
    const res = await fetch(
      `${API_URL}data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
    return await res.json()
  } catch (err) {
    console.log(err)
    alert("An error ocurred! Maybe you've typed wrond name.")
  }
}

export default getWeather

//`${API_URL}data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`,
