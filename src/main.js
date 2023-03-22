// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20
//   }
// };

// // write your code here

//   let userinput = prompt("Enter a city");
//   let city = userinput.toLocaleLowerCase();

//   if (city == "paris" || city == "tokyo" || city == "lisbon" || city == "san francisco" || city == "oslo"){
//     alert(`It is currently ${Math.round(weather[city].temp)}°C ${Math.round(
//         (weather[city].temp * 9) / 5 + 32
//       )} °F in ${city} with a humidity of ${Math.round(weather[city].humidity)}`)

//   }else{
//     alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney`);

//   }





function formatDate(timestamp){

  
let currentDate = new Date(timestamp);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentDate.getDay()];

let timeHrs = currentDate.getHours();

if(timeHrs < 10){
  timeHrs = `0${timeHrs}`;
}
let timeMin = currentDate.getMinutes();

if(timeMin < 10){
  timeMin = `0${timeMin}`;
}

return  `${day} ${timeHrs}:${timeMin}`;;
}




let apiKey = "c119ffef35b7245a5e03b6e5724ae961";

function currentCityCoordinates(position) {

  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lon=${longitude}&lat=${latitude}&units=metric`;

  axios.get(apiUrl).then(currentCityWeather);
}




function currentCityWeather(response) {

  console.log(response.data);

  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;

  let temperature = Math.round(response.data.main.temp);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature} °C`;


  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;


  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%     `;


  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)}km/h`;


  dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

}


function currentCity(event) {
  
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentCityCoordinates);
}

let currentCityBtn = document.querySelector("#current-city");
currentCityBtn.addEventListener("click", currentCity);





function searchedCityTemperature(response) {

  let temperature = Math.round(response.data.main.temp);
  
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}°C`;
  
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;


  
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;




  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%     `;


  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)}km/h`;

   dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt*1000);


}

function searchedTempCity(event) {
  event.preventDefault();
 
  let city = document.querySelector("#input-search");

  let newApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(newApiUrl).then(searchedCityTemperature);
}


let searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", searchedTempCity);








