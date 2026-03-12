// index.js will handle events


import "./style.css";
import { fetchWeather } from "./DataWork/fetchData.js";
import { renderWeather, showError } from "./dom.js";
import { weatherData } from "./DataWork/processData.js";

const locationInput = document.getElementById('location-search');
const button = document.querySelector('.search-btn');

console.log("Webpack is running!");

button.addEventListener("click", () => {
    if(locationInput.value.trim() != '') {
        console.log(locationInput.value)
        renderWeather(locationInput.value)
        locationInput.value = ''
        locationInput.blur()
    }
})

locationInput.addEventListener('keydown', (e) => {
if (e.key == 'Enter' &&
    locationInput.value.trim() != ''
) {
    console.log(locationInput.value)
    renderWeather(locationInput.value)
    locationInput.value = ''
    locationInput.blur()
}
})