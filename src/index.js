import { container } from "webpack"
import "./style.css"

const button = document.querySelector("button")
const input = document.querySelector("input")

button.addEventListener("click", () => {
  const value = input.value
  makeData(value)
  getWeek(value)
})

async function getWeatherData(place) {
  const serverData = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=b8169aa2e503489194655420241006&q=${place}&days=7`,
    { mode: "cors" }
  )
  if (serverData.status === 400) {
    throw "error"
  } else {
    const p = document.querySelector(".error")
    p.textContent = ""
    const data = await serverData.json()
    const container = document.querySelector(".container")
    container.style.visibility = "visible"
    const container_week = document.querySelector(".week")
    container_week.style.visibility = "visible"
    return data
  }
}

async function makeData(value) {
  const day = await getWeatherData(value).catch((error) => {
    const p = document.querySelector(".error")
    p.textContent = "Your place doesnt exist, try again!"
    const container = document.querySelector(".container")
    container.style.visibility = "hidden"
    const button = document.querySelector(".temp")
    button.style.visibility = "hidden"
  })

  const data = day.current
  const celcius = data.temp_c
  const farenheit = data.temp_f
  const conditionImage = data.condition.icon
  const conditionText = data.condition.text

  const img = document.querySelector("img")
  img.src = conditionImage
  const status = document.querySelector(".status")
  status.textContent = conditionText
  const degree = document.querySelector(".degree")
  degree.textContent = `${celcius} °C`
  const date = document.querySelector(".today")
  date.textContent = "Today"
  const button = document.querySelector(".temp")
  button.style.visibility = "visible"
  button.addEventListener("click", () => {
    changeType(degree, celcius, farenheit)
  })
  weather(status)
}

async function getWeek(place) {
  const week = await getWeatherData(place).catch((error) => {
    const container = document.querySelector(".week")
    while (container.firstChild) {
      container.removeChild(container.lastChild)
    }
  })
  const container = document.querySelector(".week")
  if (container.firstChild !== null) {
    while (container.firstChild) {
      container.removeChild(container.lastChild)
    }
    const data = week.forecast.forecastday
    makeForecast(data[1], container)
    makeForecast(data[2], container)
    makeForecast(data[3], container)
    makeForecast(data[4], container)
    makeForecast(data[5], container)
    makeForecast(data[6], container)
  } else {
    const data = week.forecast.forecastday
    makeForecast(data[1], container)
    makeForecast(data[2], container)
    makeForecast(data[3], container)
    makeForecast(data[4], container)
    makeForecast(data[5], container)
    makeForecast(data[6], container)
  }
}

function makeForecast(data, container) {
  const div = document.createElement("div")
  div.classList.toggle("box")
  const img = document.createElement("img")
  const degree = document.createElement("p")
  const status = document.createElement("p")
  const farenheit = data.day.avgtemp_f
  const day = document.createElement("p")
  const button = document.createElement("button")
  button.textContent = "Change Temp"
  button.addEventListener("click", () => {
    changeType(degree, data.day.avgtemp_c, farenheit)
  })
  day.textContent = getDayName("en-EN", data.date)

  img.src = data.day.condition.icon
  status.textContent = data.day.condition.text
  degree.textContent = `${data.day.avgtemp_c} °C `
  div.appendChild(img)
  div.appendChild(degree)
  div.appendChild(status)
  div.appendChild(button)
  div.appendChild(day)
  container.appendChild(div)
}
function getDayName(locale, date) {
  var date = new Date(date)
  return date.toLocaleDateString(locale, { weekday: "long" })
}

function changeType(value, tempc, tempf) {
  if (value.textContent.includes(tempf)) {
    value.textContent = `${tempc} °C`
  } else if (value.textContent.includes(tempc)) {
    value.textContent = `${tempf} °F`
  }
}

function weather(value) {
  console.log(value)
  box = document.querySelector(".container")
  if (value.contains("cloudy")) {
    box.setAttribute("style", "background-color: grey")
  } else if (value.contains("rain")) {
    box.setAttribute("style", "background-color: blue")
  } else if (value.contains("sunny")) {
    box.setAttribute("style", "background-color: yellow")
  } else if (value.contains("clear")) {
    box.setAttribute("style", "background-color: gren")
  }
}
