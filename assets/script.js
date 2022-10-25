var userCity = $("#userCity");
var searchButton = $("#search");

function getWeather(event) {
    console.log(userCity.val());
    var requestURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + (userCity.val()) + "&appid=73f18ebb6396304904fb3525f689c405"
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
};
searchButton.on("click", getWeather);