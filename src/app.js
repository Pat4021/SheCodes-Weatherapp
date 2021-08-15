 function displayTemperature(response) {
     console.log(response.data )
     let temperatureElement = document.querySelector("#temperature"); 
     let cityElement = document.querySelector("#city"); 
     let descriptionElement = document.querySelector("#weatherCondition");
     let humidityElement = document.querySelector("#humidity");
     let windElement = document.querySelector("#wind");
     temperatureElement.innerHTML = Math.round (response.data.main.temp);
     cityElement.innerHTML =  response.data.name;
     descriptionElement.innerHTML = response.data.weather[0].description; 
     humidityElement.innerHTML = response.data.main.humidity;
     windElement.innerHTML = Math.round (response.data.wind.speed);

 }
 
 let apiKey = "061254958b012ab279040ab26822d7e4";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;


 axios.get(apiUrl).then(displayTemperature);