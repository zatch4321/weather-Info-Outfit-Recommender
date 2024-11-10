<script>
$(document).ready(function() {
    const apiKey = "cb18fb31c93b21dd3bce12467170e51c";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

    const searchBox = $(".search input");
    const searchButton = $(".search button");
    const weatherIcon = $(".weather-icon");

    function getOutfitRecommendation(weatherCondition, temperature, humidity) {
        let outfitRecommendation = "Recommended outfit: ";
        if (weatherCondition === "Clear") {
            outfitRecommendation += temperature >= 30 ? 
                "Light clothing, T-shirts, shorts." : 
                temperature >= 20 ? 
                "Short sleeves or tank tops." :
                "Long sleeves or light sweaters.";
        } else if (weatherCondition === "Rain") {
            outfitRecommendation += "Waterproof jacket and boots.";
        } else if (weatherCondition === "Snow") {
            outfitRecommendation += "Warm coat, boots, gloves.";
        } else if (weatherCondition === "Clouds") {
            outfitRecommendation += "Light layers.";
        } else {
            outfitRecommendation += "Comfortable clothing.";
        }
        return outfitRecommendation;
    }

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status === 404) {
            $(".error").fadeIn();
            $(".weather").fadeOut();
        } else {
            const data = await response.json();
            $(".city").text(data.name);
            $(".temp").text(Math.round(data.main.temp) + "°C");
            $(".humidity").text(data.main.humidity + "%");
            $(".wind").text(data.wind.speed + " km/h");
            
            let weatherType = data.weather[0].main;
            let outfit = getOutfitRecommendation(weatherType, data.main.temp, data.main.humidity);
            
            if (weatherType === "Clouds") {
                weatherIcon.attr("src", "images/clouds.png");
            } else if (weatherType === "Clear") {
                weatherIcon.attr("src", "images/clear.png");
            } else if (weatherType === "Rain") {
                weatherIcon.attr("src", "images/rain.png");
            } else if (weatherType === "Drizzle") {
                weatherIcon.attr("src", "images/drizzle.png");
            } else if (weatherType === "Snow") {
                weatherIcon.attr("src", "images/snow.png");
            } else if (weatherType === "Mist") {
                weatherIcon.attr("src", "images/mist.png");
            }

            $(".outfit-recommendation").text(outfit);
            $(".weather").fadeIn();
            $(".error").fadeOut();
        }
    }

    searchButton.click(function() {
        const city = searchBox.val().trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name.");
        }
    });
});
</script>
