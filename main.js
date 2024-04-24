const button = document.getElementById("weather-button");
const input = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");

async function getData(cityName) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=96db297f22984be4880163835242304&q=${cityName}&aqi=yes`
    );
    if (response.ok) {
        return await response.json(); // Return the JSON data
    } else {
        throw new Error("Failed to fetch weather data");
    }
}

button.addEventListener("click", async () => {
    const cityName = input.value; // Get the input value
    try {
        const result = await getData(cityName); // Get the weather data
        localStorage.setItem("city-Name", cityName); // Save to local storage

        // Update the weather-result div with the fetched data
        const current = result.current;
        const location = result.location;

        const weatherHtml = `
            <h2>Weather in ${location.name}, <br>${location.region}, ${location.country}</h2>
            <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
            <p>Condition: ${current.condition.text}</p>
            <img src="${current.condition.icon}" alt="Weather Icon">
        `;

        weatherResult.innerHTML = weatherHtml; // Insert the weather data into the div
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherResult.innerHTML = "<p>Could not fetch weather data. Please try again.</p>"; // Display error message
    }
});

const locaButton = document.getElementById("location-button"); 
const locationWeatherResult = document.getElementById("location-weather-result");


async function getData2(lat, long) {
    const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=96db297f22984be4880163835242304&q=${lat},${long}&aqi=yes`
    );
    if (response.ok) {
        return await response.json(); // Return the JSON data
    } else {
        throw new Error("Failed to fetch weather data");
    }
}

async function gotLocation(position) {
    const result = await getData2(position.coords.latitude, position.coords.longitude);
    const current = result.current;
    const location = result.location;
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const currentDate = new Date();
    const date = `${currentDate.getDate().toString().padStart(2, '0')}:${(currentDate.getMonth() + 1).toString().padStart(2, '0')}:${currentDate.getFullYear()}`;
    
    function updateClock() {
        const currentTime = new Date();
        return `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`;
    }

    const weatherHtml = `
        <h2>Weather in ${location.name}, ${location.country}</h2>
        <p>Latitude: ${latitude}, Longitude: ${longitude}</p>
        <p>Time: <span id="liveClock">${updateClock()}</span></p>
        <p>Date: ${date}</p>
        <p>Temperature: ${current.temp_c}°C (${current.temp_f}°F)</p>
        <p>Condition: ${current.condition.text}</p>
        <img src="${current.condition.icon}" alt="Weather Icon"> <!-- Displaying weather icon -->
    `;

    locationWeatherResult.innerHTML = weatherHtml;

    // Set up the clock to update every second
    setInterval(() => {
        const liveClockElement = document.getElementById("liveClock");
        if (liveClockElement) {
            liveClockElement.innerText = updateClock(); // Update the time in the HTML
        }
    }, 1000);
}



function errorLocation(){
    locationWeatherResult.innerHTML = "<p>Could not get your location. Please check your device settings and try again.</p>";
}

locaButton.addEventListener("click", async () =>{
    navigator.geolocation.getCurrentPosition(gotLocation,errorLocation);

});