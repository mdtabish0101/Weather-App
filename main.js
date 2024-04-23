const button = document.getElementById('weather-button');
const input = document.getElementById('city-input');

async function getData(cityName){
    const promise = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=96db297f22984be4880163835242304&q=${cityName}&aqi=yes`
    );
    return await promise.json();
}

button.addEventListener('click', async () =>{
    const value = input.value;
    result = await getData(value);
    console.log(result);
});

