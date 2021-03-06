var searchButton = $('.searchBtn');
var citySearch = S('.city-input');

var key = "c8991a84574210433ef4c391a616abb1"; 

var chosenCityEl = $('.chosen-city');
var currentDateEl = $('.current-date');
var weatherIconEl = $('.weather-icon');
var cityListEl = $('.city-list');
 
var todaysDate = moment().format("MMM Do YYYY");
var tempEl = $('.temp');
var humidityEl = $('.humidity');
var windSpeedEl = $('.wind-speed');
var uvIndexEl = $('.uv-index');
var cardRow = $('.card-row');


//start city search
searchButton.on('click', function(e) {
    e.preventDefault();

    getWeatherInfo(citySearch.val());
});

$(document).on('click', '.savedSearch', function() {
    let thisElement = $(this);
    getWeatherInfo(thisElement.text());
})

//local storage to store city search history
function renderSavedSearches(chosenCityName) {
    cityListEl.empty();
    let cityListArr = JSON.parse(localStorage.getItem('citySearches'));
    for (let i = 0; i < cityListArr.length; i++) {
        let newListItem = $('<li>').attr('class', 'savedSearch');
        newListItem.text(cityListArr[i]);
        cityListEl.prepend(newListItem);
    }
}

function renderWeatherInfo(chosenCityName, cityTemp, cityHumid, cityWindSp, cityWthrIcon, uvRate) {
    chosenCityEl.text(chosenCityName);
    currentDateEl.text(todaysDate);
    tempEl.text('Temperature: ${cityTemp} °F');
    humidityEl.text('Humidity: ${cityHumid}%');
    windSpeedEl.text('Wind Speed: ${cityWindSp} MPH');
    uvIndexEl.text('UV Index: ${uvRate}');
    weatherIconEl.attr('src', cityWthrIcon);
}

//function to get current weather from api 
function getWeatherInfo(selectedCity) {
    let queryUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${key}&units=imperial';
    $.ajax({
        url: queryUrl,
        method: 'GET' 
    })
    .then(function(weatherInfo) {
        let cityInfo = {
            chosenCityName: weatherInfo.name,
            cityTemp: weatherInfo.main.temp,
            cityHumid: weatherInfo.main.humidity,
            cityWindSp: weatherInfo.wind.speed,
            uvRate: weatherInfo.coord,
            cityWthrIcon: weatherInfo.weather[0].icon 
        }
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityInfo.uvRate.lat}&lon=${cityInfo.uvRate.lon}&APPID=${key}&units=imperial`
    $.ajax({
        url: queryUrl,
        method: 'GET'
    })
    then 
    })
}

//current weather data api


//5 day forecast api
//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}






