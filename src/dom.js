import { fetchWeather } from "./DataWork/fetchData.js";
import { weatherData } from "./DataWork/processData.js";

const firstPrompt = document.querySelector(".first-prompt")
const WeatherContainer = document.querySelector('.weather-container')
const tempValue = document.querySelector(".temp-label");
const conditionsLabel = document.querySelector(".conditions-label");
const humidityValue = document.querySelector(".humidity-value");
const windValue = document.querySelector(".wind-value");
const feelsLike = document.querySelector(".feels-like-value");
const locationLabel = document.querySelector(".location-label");
const todayLabel = document.querySelector(".today-date-label");
const weatherOverviewIcon = document.querySelector("#weather-overview-icon")
const ForecastContainer = document.querySelector(".forecast-container")


function fetchWeatherIcon(icon) {
    console.log(icon)

    return `${icon}.svg`
}

function getTodate() {
    const ToDate = new Date()
    console.log(ToDate)
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = ToDate.toLocaleDateString('en-US', options);
    console.log(formattedDate);
    return formattedDate;
}

async function fetchForecast(location) {
    const forecastData = await fetchWeather('forecast', location)
    console.log(forecastData)
    const foreCastCollection = []

    for (let i = 1; i < 8; i++) {
        const dayForecast = forecastData.days[i]
        const date = new Date(dayForecast.datetime).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
        });

        const conditions = dayForecast.conditions
        const temp = Math.round(dayForecast.temp)
        const icon = fetchWeatherIcon(dayForecast.icon)

        foreCastCollection.push({
            date,
            conditions,
            temp,
            icon,
            iconPath: `icons/${icon}`
        })

    }
    console.log(foreCastCollection)
    return foreCastCollection
}

export async function renderWeather(location) {
    const rawData = await fetchWeather(location)

    if(!rawData) {
        return
    }
    const data = weatherData(rawData)
    console.log(data)

    WeatherContainer.style.display = "block";
    forecastContainer.style.display = "flex";
    firstPrompt.style.display = "none";

    locationLabel.textContent = data.location
    conditionsLabel.textContent = data.conditions
    tempValue.textContent = data.temp + '°C'
    windValue.textContent = data.windspeed + 'm/s'
    humidityValue.textContent = data.humidity + '%'
    feelsLike.textContent = data.feelslike + '°C'
    todayLabel.textContent = getTodate()
    weatherOverviewIcon.src = `icons/${fetchWeatherIcon(data.icon)}`

    const forecast7days = await fetchForecast(location)
    ForecastContainer.innerHTML = ''
    forecast7days.forEach(day => {
        const card = document.createElement('div')
        card.classList.add('forecast-item')

        const dateLabel = document.createElement('h5')
        dateLabel.classList.add('forecast-date')
        dateLabel.textContent = `${day.date}`

        const conditionsIcon = document.createElement('img')
        conditionsIcon.classList.add('forecast-icon')
        conditionsIcon.src = `${day.iconPath}`

        const tempLabel = document.createElement('h5')
        tempLabel.classList.add('forecast-temp')
        tempLabel.textContent = `${day.temp}` + '°C'
        
        ForecastContainer.appendChild(card)
        card.append(dateLabel, conditionsIcon, tempLabel)

    })
} 


export function showError() {
    const container = document.getElementById("weather-display");
    container.innerHTML = `<p style="color:red;">City not found.</p>`;
  }