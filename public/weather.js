

// Get users geolocation
if (navigator.geolocation) {
   // Request the current position
   // If successful, call getPosSuccess; On error, call getPosErr
   navigator.geolocation.getCurrentPosition(getPosSuccess, getPosErr);
} else {
   alert('geolocation not available?! What year is this?');
   // IP address or prompt for city?
}

// getCurrentPosition: Successful return
function getPosSuccess(pos) {
 // Get the coordinates and accuracy properties from the returned object
 var geoLat = pos.coords.latitude.toFixed(5);
 var geoLng = pos.coords.longitude.toFixed(5);
 var geoAcc = pos.coords.accuracy.toFixed(1);
}

// getCurrentPosition: Error returned
function getPosErr(err) {
 switch (err.code) {
   case err.PERMISSION_DENIED:
     alert("User denied the request for Geolocation.");
     break;
   case err.POSITION_UNAVAILABLE:
     alert("Location information is unavailable.");
     break;
   case err.TIMEOUT:
     alert("The request to get user location timed out.");
     break;
   default:
     alert("An unknown error occurred.");
 }
}

// SELECT ELEMENTS
const iconElement = document.querySelector(".icon-weather");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = process.env.MY_API_KEY;

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});







// //////////////////

//  function weather() {

//   const apiKey = "1958e098d51e832d748e677492b365b9";

//   navigator.geolocation.getCurrentPosition(position);
  
//   var lat = position.coords.latitude;
//   var lon = position.coords.longitude;
  

//   const url =
//     "https://api.openweathermap.org/data/2.5/weather?lat=" +
//     lat +
//     "&lon" +
//     lon +
//     "?appid=" +
//     apiKey +
//     "&units=metric";

//   return https.get(url, function (response) {
//     response.on("data", function (data) {
//       const weatherData = JSON.parse(data);
//       const temp = weatherData.main.temp;
//       const icon = weatherData.weather[0].icon;
//       const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
//     });
//   });
// };
