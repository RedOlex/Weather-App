const apiKey = "apikey";
const unsplashApiKey = 'Apikey';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const weatherUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const unsplashUrl = (condition) => `https://api.unsplash.com/photos/random?query=${condition}&orientation=landscape&client_id=${unsplashApiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(weatherUrl(city));
        const respData = await resp.json();
        const condition = respData.weather[0].main.toLowerCase();
        const unsplashResp = await fetch(unsplashUrl(condition));
        const unsplashData = await unsplashResp.json();
        
        addWeatherToPage(respData, unsplashData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function addWeatherToPage(weatherData, imageData) {
    const temp = Ktoc(weatherData.main.temp);

    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2>
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" /> ${temp}°C
            <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" />
        </h2>
        <small>${weatherData.weather[0].main}</small>
    `;

    // Set the background image
    document.body.style.backgroundImage = `url(${imageData.urls.regular})`;

    // Cleanup
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
});
