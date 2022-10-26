var userCity = $("#userCity");
var searchButton = $("#search");
var currentEl = $("#current");
var futureEl = $("#future");
var savedEl = $("#saved");

function getWeather(event) {
    console.log(userCity.val());
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + (userCity.val()) + "&units=imperial&appid=73f18ebb6396304904fb3525f689c405"
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            var cityName = data.name;
            var cityNameEl = $('<h3>');
            cityNameEl.text(cityName);
            currentEl.append(cityNameEl);

            var date = data.dt;
            var dateFormat = new Date(date * 1000).toLocaleDateString();
            var dateEl = $('<p>');
            dateEl.text(dateFormat);
            currentEl.append(dateEl);

            var icon = data.weather.icon;
            var iconEl = $('<img>');
            //iconEl.attr(icon);
            currentEl.append(iconEl);
        });
    getForecast();
};
function getForecast() {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + (userCity.val()) + "&units=imperial&appid=73f18ebb6396304904fb3525f689c405"
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var forecastDate = data.list[0].dt;
            var dateFormat = new Date(forecastDate * 1000).toLocaleDateString();
            var forecastDateEl = $('<p>');
            forecastDateEl.text(dateFormat);
            futureEl.append(forecastDateEl);

            var forecastTemp = data.list[0].main.temp
            var forecastTempEl = $('<p>');
            forecastTempEl.text(forecastTemp + "°F");
            futureEl.append(forecastTempEl);
            // for (var i = 0; i < data.list.length; i + 8) {
               

            // }
        });

};
searchButton.on("click", getWeather);