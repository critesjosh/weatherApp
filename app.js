var latitude;
var longitude;

var temperatureF;
var temperatureC;
var currentConditions;
var cloudiness;
var locationName;

var setLocation = function(lat, long) {
  latitude = lat;
  longitude = long;
  console.log(latitude, longitude);
}

var getWeather = function() {
  $.ajax( "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=f3d14dbe557363b056746449d5ebdc9a", {
    dataType: 'json'
  }).done(function(data){
    console.log(data);
    locationName = data.name;
    currentConditions = data.weather[0].main;
    var temp = data.main.temp;
    temperatureF = 9 / 5 * (temp - 273) + 32;
    temperatureC = temp - 273;
    cloudiness = data.clouds.all + '%';
  });
}

navigator.geolocation.getCurrentPosition(function(position) {
  setLocation(position.coords.latitude, position.coords.longitude);
  getWeather();
});
