var searchButton = $('.searchBtn');
var citySearch = $('.city-input');

//api key
var apiKey = '88dc99a68986cfd493639c4fb6cc6344'; 

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
searchButton.on('click', function(event) {
    event.preventDefault();

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
    tempEl.text(`Temperature: ${cityTemp} °F`);
    humidityEl.text(`Humidity: ${cityHumid}%`);
    windSpeedEl.text(`Wind Speed: ${cityWindSp} MPH`);
    uvIndexEl.text(`UV Index: ${uvRate}`);
    weatherIconEl.attr('src', cityWthrIcon);
}

//function to get current weather from api 
function getWeatherInfo(selectedCity) {
    let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrl,
        method: "GET"
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
    
    //get uv index
    let queryUrlUv = `https://api.openweathermap.org/data/2.5/uvi?lat=${cityInfo.uvRate.lat}&lon=${cityInfo.uvRate.lon}&appid=${apiKey}&units=imperial`;
    $.ajax({
        url: queryUrlUv,
        method: 'GET'
    })
    .then(function(uvInfo) {
        if (JSON.parse(localStorage.getItem('citySearches')) == null) {
            let cityListArr = [];
            if (cityListArr.indexOf(cityInfo.chosenCityName) === -1) {
                cityListArr.push(cityInfo.chosenCityName);
                localStorage.setItem('citySearches', JSON.stringify(cityListArr));
                let displayedWthrIcon = `https://openweathermap.org/img/w/${cityInfo.cityWthrIcon}.png`;               
                renderWeatherInfo(cityInfo.chosenCityName, cityInfo.cityTemp, cityInfo.cityHumid, cityInfo.cityWindSp, displayedWthrIcon, uvInfo.value);               
                renderSavedSearches(cityInfo.chosenCityName);
            }else{
                let displayedWthrIcon = `https://openweathermap.org/img/w/${cityInfo.cityWthrIcon}.png`;
                renderWeatherInfo(cityInfo.chosenCityName, cityInfo.cityTemp, cityInfo.cityHumid, cityInfo.cityWindSp, displayedWthrIcon, uvInfo.value);
            }
        }else{
            let cityListArr = JSON.parse(localStorage.getItem('citySearches'));
            if (cityListArr.indexOf(cityInfo.chosenCityName) === -1) {
                cityListArr.push(cityInfo.chosenCityName);
                localStorage.setItem('citySearches', JSON.stringify(cityListArr));
                let displayedWthrIcon = `https://openweathermap.org/img/w/${cityInfo.cityWthrIcon}.png`;
                renderWeatherInfo(cityInfo.chosenCityName, cityInfo.cityTemp, cityInfo.cityHumid, cityInfo.cityWindSp, displayedWthrIcon, uvInfo.value);               
                renderSavedSearches(cityInfo.chosenCityName);
            }else{
                let displayedWthrIcon = `https://openweathermap.org/img/w/${cityInfo.cityWthrIcon}.png`;
                renderWeatherInfo(cityInfo.chosenCityName, cityInfo.cityTemp, cityInfo.cityHumid, cityInfo.cityWindSp, displayedWthrIcon, uvInfo.value);
            }
        
        }
    })
    });

// get five day forecast
//5 day forecast api
//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
    function displayNextFiveDays() {
        cardRow.empty();
        let queryUrl = 'https://api.openweathermap.org/data/2.5/forecast?q={selectedCity}&appid={apiKey}'
        $.ajax({
            url: queryUrl,
            method: 'GET'
        })
        .then (function(fiveDayForecast) {
            for (let i = 0; i != fiveDayForecast.list.length; i+=8 ) {
                let cityInfo = {
                    date: fiveDayForecast.list[i].dt_txt,
                    icon: fiveDayForecast.list[i].weather[0].icon,
                    temp: fiveDayForecast.list[i].main.temp,
                    humidity: fiveDayForecast.list[i].main.humidity
                }
                let dateInfo = cityInfo.date;
                let trDate = dateInfo.substring(0, 10);
                let wthrIcon = 'https://openweather.org/img/w/${cityInfo.icon}.png';
                displayForecastCard(trDate, wthrIcon, cityInfo.temp, cityInfo.humidity);
            }
        })
    }

}

function displayForecastCard(date, icon, temp, humidity) {
    let fiveDayForecastEl = $('<div>').attr('class', '5-day-forecast');
    let forecastDate = $('<h3').attr('class', 'card-text');
    let forecastIcon = $('<img>').attr('class', 'weather-icon');
    let forecastTemp = $('<p>').attr('class', 'card-text');
    let forecastHumidity = $('<p>').attr('class', 'card-text');

    cardRow.append(fiveDayForecastEl);
    forecastDate.text(date);
    forecastIcon.attr('src', icon);
    forecastTemp.text('Temp: ${temp} °F');
    forecastHumidity.text('Humidity: ${humidity}%');
    fiveDayForecastEl.append(forecastDate, forecastIcon, forecastTemp, forecastHumidity);
}









