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

function renderWeatherInfo(chosenCityName, cityTemp, cityHumid, cityWindSp, cityWthrIcon, uvRate) {
    chosenCityEl.text(chosenCityName);
    currentDateEl.text(todaysDate);
    tempEl.text('Temperature: ${cityTemp} °F');
    humidityEl.text('Humidity: ${cityHumid}%');
    windSpeedEl.text('Wind Speed: ${cityWindSp} MPH');
    uvIndexEl.text('UV Index: ${uvRate}');
    weatherIconEl.attr('src', cityWthrIcon);
}

//function to get weather from api 
https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

//local storage to store city search history
for (var i = 0; i < localStorage.length; i++) {
     var city = localStorage.getItem(i);
}

// $('.saveBtn').on('click', function () {
//     var eventDescription = $(this).siblings('.description').val();
//     var timeOfDay = $(this).parent().attr('id');

//     localStorage.setItem(timeOfDay, eventDescription);
// });

