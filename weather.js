// ================= CONFIG =================
// You need an API key from OpenWeatherMap
const API_KEY = 'YOUR_API_KEY_HERE'; // replace with your API key

// DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');
const cityName = document.getElementById('cityName');
const dateTime = document.getElementById('dateTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// ================= HELPER FUNCTION =================
function getWeatherIcon(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// ================= FETCH WEATHER =================
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Display data
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        const now = new Date();
        dateTime.textContent = now.toLocaleString();
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind: ${data.wind.speed} m/s`;

        // Weather icon
        weatherIcon.innerHTML = `<img src="${getWeatherIcon(data.weather[0].icon)}" alt="Weather Icon">`;

        // Show weather section
        weatherDisplay.classList.remove('hidden');
    } catch (error) {
        alert(error.message);
        weatherDisplay.classList.add('hidden');
    }
}

// ================= FORM EVENT =================
weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeather(city);
        cityInput.value = '';
    }
});
