async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "135044f2590fdbd15b5ad868d39f75c0";

    if (city === "") {
        showError("Please enter a city name!");
        return;
    }

    const url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            showError("City not found!");
            return;
        }

        const data = await response.json();

        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temperature").textContent = 
            `Temperature: ${data.main.temp}°C`;
        document.getElementById("humidity").textContent = 
            `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").textContent = 
            `Wind Speed: ${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weather-result").classList.remove("hidden");
        document.getElementById("error").textContent = "";

    } catch (err) {
        showError("Something went wrong!");
    }
}

function showError(msg) {
    document.getElementById("error").textContent = msg;
    document.getElementById("weather-result").classList.add("hidden");
}
