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
            <h2>Weather in ${location.name}, ${location.country}</h2>
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
