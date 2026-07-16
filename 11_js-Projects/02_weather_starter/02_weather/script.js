document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const weatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const cityTemp = document.getElementById("temperature");
  const weatherDesc = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  let API_key = "fdc5f12917159c163a4d876776f0522e";

  weatherBtn.addEventListener("click", async () => {
    let city = cityInput.value.trim();
    if (city === "") return;

    try{
       let data = await fetchData(city);

       weatherInfo.classList.remove("hidden");
       errorMsg.classList.add("hidden");

       cityName.innerText = data.name;
       cityTemp.innerText = (data.main.temp - 273.15).toFixed(2);
       weatherDesc.innerText = data.weather[0].description

       console.log(data)
    } catch (error){
        errorMessage();
    }
  });

  async function fetchData(city) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error("City not found")
    }
    let data = await response.json();

    return data
  }

  function errorMessage() {
    weatherInfo.classList.add("hidden");
    errorMsg.classList.remove("hidden");
  }
});
