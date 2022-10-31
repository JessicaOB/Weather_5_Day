var userCity = $("#userCity");
var searchButton = $("#search");
var currentEl = $("#current");
var futureEl = $("#future");
var savedEl = $("#saved");
var savedCities = JSON.parse(localStorage.getItem("savedCities")) || []

function getWeather(city) {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + (city) + "&units=imperial&appid=73f18ebb6396304904fb3525f689c405"
    fetch(requestURL)
        .then(function (response) {
            if (response.status !== 200) {
                alert("City not found!")
                return
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            if (savedCities.includes(data.name) === false) {
                savedCities.unshift(data.name)
                localStorage.setItem("savedCities", JSON.stringify(savedCities))
                console.log(localStorage.getItem("savedCities"))
            }
            
            currentEl.empty();

            currentEl.attr("class", "card-body m-2 border border-warning rounded p-3");
            var cityName = data.name;
            var cityNameEl = $('<h3>');
            cityNameEl.text(cityName);
            currentEl.append(cityNameEl);

            var date = data.dt;
            var dateFormat = new Date(date * 1000).toLocaleDateString();
            var dateEl = $('<p>');
            dateEl.text(dateFormat);
            currentEl.append(dateEl);

            var icon = data.weather[0].icon;
            var iconEl = $('<img>');
            iconEl.attr("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
            currentEl.append(iconEl);

            var temp = data.main.temp;
            var tempEL = $("<p>");
            tempEL.text("Temperature: " + temp + " °F")
            currentEl.append(tempEL);

            var humidity = data.main.humidity;
            var humidityEL = $("<p>");
            humidityEL.text("Humidity: " + humidity + " %")
            currentEl.append(humidityEL);

            var windSpeed = data.wind.speed;
            var windEL = $("<p>");
            windEL.text("Wind Speed: " + windSpeed + "  MPH")
            currentEl.append(windEL);
        });
    getForecast(city);
};
function getForecast(city) {
    var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + (city) + "&units=imperial&appid=73f18ebb6396304904fb3525f689c405"
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            futureEl.empty();
            var header = $("<h3>");
            header.text("5 Day Forecast");
            futureEl.append(header);

            for (var i = 0; i < data.list.length; i = i + 8) {

                var forecastCard = $("<div>");
                forecastCard.attr("class", "card col-2 m-1 bg-info text-white");
                futureEl.append(forecastCard);

                var forecastDate = data.list[i].dt;
                var dateFormat = new Date(forecastDate * 1000).toLocaleDateString();
                var forecastDateEl = $('<p>');
                forecastDateEl.text(dateFormat);
                forecastCard.append(forecastDateEl);

                var forecastIcon = data.list[i].weather[0].icon;
                var forecastIconEl = $('<img>');
                forecastIconEl.attr("src", "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png");
                forecastCard.append(forecastIconEl);

                var forecastTemp = data.list[i].main.temp;
                var forecastTempEl = $('<p>');
                forecastTempEl.text("Temperature: " + forecastTemp + " °F");
                forecastCard.append(forecastTempEl);

                var forecastHumidity = data.list[i].main.humidity;
                var forecastHumidityEl = $('<p>');
                forecastHumidityEl.text("Humidity: " + forecastHumidity + " %");
                forecastCard.append(forecastHumidityEl);

                var forecastWind = data.list[i].wind.speed
                var forecastWindEl = $('<p>');
                forecastWindEl.text("Wind Speed: " + forecastWind + "  MPH");
                forecastCard.append(forecastWindEl)
            }
        });
};
for (var i = 0; i < savedCities.length; i++) {
    var searchEL = $('<button>');
    searchEL.text(savedCities[i]);
    searchEL.attr("class", "btn btn-warning btn-sm m-2 city");
    savedEl.append(searchEL);
};
$(document).on("click", ".city", function(event) {
    event.preventDefault();
    var cityButton = $(this).text();
    getWeather(cityButton);
});
searchButton.on("click", function (event) {
    getWeather(userCity.val())
});
