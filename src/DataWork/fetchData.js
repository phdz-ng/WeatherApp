//api.js should only handle fetching data

const api_key = "FTTAE6KEPNCF45BNPZJJHSU67";
const locationInput = document.getElementById('location-search');
const form = document.getElementById('weather-form');


export async function fetchWeather(location) {

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${api_key}&contentType=json`;
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Location not found");
    }
    const data = await response.json();
      // Normalize both values for comparison
    const userInput = location.trim().toLowerCase();
    const resolved = data.resolvedAddress.toLowerCase();

  // Strict check: must start with the exact city name
  if (!resolved.startsWith(userInput)) {
    throw new Error("Location not found (exact match required)");
  }

  return data;
}