var latitude;
var longitude;

var temperatureF;
var temperatureC;
var weatherID;
var currentConditions;
var cloudiness;
var locationName;

var currentTime = Math.round(new Date().getTime()/1000);
var sunrise;
var sunset;

var setLocation = function(lat, long) {
  latitude = lat;
  longitude = long;
}

var getWeather = function() {
  $.ajax( "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=f3d14dbe557363b056746449d5ebdc9a", {
    dataType: 'json'
  }).done(function(data){
    console.log(data);
    locationName = data.name;
    currentConditions = data.weather[0].description;
    weatherID = data.weather[0].id;
    var temp = data.main.temp;
    temperatureF = Math.floor(9 / 5 * (temp - 273) + 32);
    temperatureC = Math.floor(temp - 273);
    cloudiness = data.clouds.all + '%';
    sunrise = data.sys.sunrise;
    sunset = data.sys.sunset;
    displayWeather();
  });
}

var displayWeather = function() {
  if (weatherID >= 200 && weatherID < 600){
    //show rain background
    if (currentTime < sunset){
      $("body").css('background-image', 'url("images/rainyDay.jpeg")');
    } else {
      $("body").css('background-image', 'url("images/rainyNight.jpg")');
    }
  } else if (weatherID >= 600 && weatherID < 630) {
    //show snow background
    if (currentTime < sunset){
      $("body").css('background-image', 'url("images/snowyDay.jpeg")');
    } else {
      $("body").css('background-image', 'url("images/snowyNight.jpeg")');
    }
  } else if (weatherID >= 700 && weatherID < 801) {
    //show clear background
    if (currentTime < sunset) {
      $("body").css('background-image', 'url("images/clearDay.jpeg")');
    } else {
      $("body").css('background-image', 'url("images/clearNight.jpeg")');
    }
  } else if (weatherID >= 801 && weatherID < 805) {
    //show cloudy background
    if (currentTime < sunset){
      $("body").css('background-image', 'url("images/cloudyDay.jpeg")');
    } else {
      $("body").css('background-image', 'url("images/cloudyNight.jpeg")');
    }
  } else if (weatherID >= 900) {
    //show something
    $("body").css('background-image', 'url("images/storm.jpeg")');
  }

  $("#weather-info").html('<p>The current weather in ' + locationName + ' is:</p>');
  $("#weather-info").append('<p id="temp" class="F"></p>');
  if ($("#temp").hasClass("F")) {
    $("#temp").text(temperatureF + '\u00B0F');
  } else {
    $("#temp").text(temperatureC + '\u00B0C');
  }
  $("#weather-info").append('<button id="toggle-temp-units" class="text-center btn btn-default">Switch Units</button>');
  $("#weather-info").append('<p>' + currentConditions + '</p>');

  $("#toggle-temp-units").click(function(){
    $("#temp").toggleClass("F");
    if ($("#temp").hasClass("F")) {
      $("#temp").text(temperatureF + '\u00B0F');
    } else {
      $("#temp").text(temperatureC + '\u00B0C');
    }
  });
}

navigator.geolocation.getCurrentPosition(function(position) {
  setLocation(position.coords.latitude, position.coords.longitude);
  getWeather();
});
