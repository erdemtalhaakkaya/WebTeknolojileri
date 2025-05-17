const url = 'https://api.openweathermap.org/data/2.5/';
const key = '362f04914f3ecdba012f8d5e7884fd68';

const iconMap = {
    "Clear": "bi-brightness-high",
    "Clouds": "bi-cloud",
    "Rain": "bi-cloud-drizzle",
    "Snow": "bi-snow",
    "Thunderstorm": "bi-cloud-lightning",
    "Drizzle": "bi-cloud-rain",
    "Mist": "bi-cloud-fog2"
};

const setQuery = (e) => {
    if (e.keyCode === 13) {
        getResult(searchBar.value);
    }
};

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
        .then((weather) => weather.json())
        .then(displayResult);
};

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°C / ${Math.round(result.main.temp_max)}°C`;

    let icon = document.querySelector('.weather-icon i');
    let mainCondition = result.weather[0].main;
    icon.className = `bi ${iconMap[mainCondition] || "bi-question-circle"}`;
};

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery);