 function formatDate(timestamp) {
      let date = new Date(timestamp); 
      let hours = date.getHours();
      if (hours < 10) {
          hours = `0${hours}`;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
          minutes = `0${minutes}`;
      }
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[date.getDay()];
      return `Last Updated on: ${day} at ${hours}:${minutes}`;
 }

 function formatForcastDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

   return days[day];

 }

 function displayForecast(response) {
      let forecast = response.data.daily;
     
      let forecastElement = document.querySelector("#forecast");
          
      let forecastHTML = `<div class="row">`;
      forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
        forecastHTML = forecastHTML + 
        `      
      <div class="col-2">
         <div class="day">${formatForcastDay(forecastDay.dt)}
         </div>
         <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" /> 
         <div class="forcast-temp">
         <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}º </span><span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}º</span>
         </div>
       </div>`;
        }
     });

    forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML = forecastHTML;
 }

function getForecast(coordinates){
  let apiKey = "061254958b012ab279040ab26822d7e4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast); 
}
 
 function displayTemperature(response) {
       
     let temperatureElement = document.querySelector("#temperature"); 
     let cityElement = document.querySelector("#city"); 
     let descriptionElement = document.querySelector("#weatherCondition");
     let humidityElement = document.querySelector("#humidity");
     let windElement = document.querySelector("#wind");
     let dateElement = document.querySelector("#date");
     let iconElement = document.querySelector("#icon");

     celciusTemp = Math.round(response.data.main.temp);
     
     temperatureElement.innerHTML = Math.round (celciusTemp);
     cityElement.innerHTML =  response.data.name;
     descriptionElement.innerHTML = response.data.weather[0].description; 
     humidityElement.innerHTML = response.data.main.humidity;
     windElement.innerHTML = Math.round (response.data.wind.speed);
     dateElement.innerHTML = formatDate(response.data.dt * 1000);
     iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
     iconElement.setAttribute("alt", response.data.weather[0].description);


   
    getForecast(response.data.coord);
    

 }

function search(city) {

 let apiKey = "061254958b012ab279040ab26822d7e4";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayTemperature); 

}

 function handleSubmit(event) {
     event.preventDefault();
     let cityInputElement = document.querySelector("#city-input");
     search(cityInputElement.value);

 }

 function showFarenheit(event) {
     event.preventDefault();
      let temperatureElement = document.querySelector("#temperature");
      celciusLink.classList.remove("active");
      farenheitLink.classList.add("active");
     let farenTemp = (celciusTemp * 9) / 5 + 32;
     temperatureElement.innerHTML = Math.round(farenTemp);

 }

 function showCelcius(event) {
     event.preventDefault();
     celciusLink.classList.add("active");
      farenheitLink.classList.remove("active");
     let temperatureElement = document.querySelector("#temperature");
     temperatureElement.innerHTML = celciusTemp;  
       
 }
 
 let celciusTemp = null;   

 let form = document.querySelector("#search-form"); 
 form.addEventListener("submit",handleSubmit);

 let farenheitLink = document.querySelector("#faren");
 farenheitLink.addEventListener("click", showFarenheit);  

 let celciusLink = document.querySelector("#celci");
 celciusLink.addEventListener("click", showCelcius);  

search("London");
 
