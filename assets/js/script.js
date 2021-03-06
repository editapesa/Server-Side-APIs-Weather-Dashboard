var searchButton = $('.searchBtn');
var citySearch = S('.city-input');

var key = "c8991a84574210433ef4c391a616abb1"; 

var chosenCityEl = $('.chosen-city');
var currentDateEl = $('current-date')
 
var todaysDate = moment().format("MMM Do YYYY");


//function to enter city for search


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

