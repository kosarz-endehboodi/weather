//var
let clockHourEl = document.getElementById("hour");
let clockMinEl = document.getElementById("min");
let dayMM = document.getElementById("dayMM");
let city = document.getElementById("cityName");
let cityform = document.getElementById("cityForm");
let tempElement = document.getElementById("numberdgrs");
let selectLocation = document.getElementById("showloc");
let units = "metric";
let apiKey = "c5135fc130d435646a416541ffe05185";
let iconShowLocation = document.getElementById("location");

//eventlistner
//mylocation
iconShowLocation.addEventListener("click", showmylocation);
//searchlocation
cityform.addEventListener("submit", showcity);

//date set
let hour = new Date().getHours();
let min = new Date().getMinutes();
clockHourEl.innerText = `${hour}`;
clockMinEl.innerText = `${min}`;
if (hour < 10) {
  clockHourEl.innerText = `0${hour}`;
}
if (min < 10) {
  clockMinEl.innerText = `0${hour}`;
}

let date = new Date();
function formtDate() {
  //var for day,month,year
  let days = ["Sun", "Min", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let week = date.getDay();
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();
  dayMM.innerText = `${days[week]} , ${months[month]} ${day} ,${year} `;
}
formtDate(date);

//chalenge 2

//show city in label

function showcity(e) {
  e.preventDefault();
  //api
  //var
  let cityName = city.value;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  //function show search location
  function showtempcity(response) {
    console.log(response.data);
    let country = response.data.sys.country;
    let city = response.data.name;
    let temp = response.data.main.temp;
    temp = Math.round(response.data.main.temp);
    tempElement.innerText = `${temp}`;
    selectLocation.innerText = `${city},${country}`;
  }
  //axios-->go api -->run function
  axios.get(apiUrl).then(showtempcity);
}

//challnge3
//temp value

//console.log(temp);
//btns
let BTNTEMP = document.getElementById("tempbtn");
let BTNFAR = document.getElementById("farnbtn");

//set to far
BTNFAR.addEventListener("click", fhar);
function fhar(event) {
  event.preventDefault();
  let temp = document.getElementById("numberdgrs");
  temp.innerText = "22";
}

//set to temprature
BTNTEMP.addEventListener("click", temps);
function temps(event) {
  event.preventDefault();
  let temp = document.getElementById("numberdgrs");
  temp.innerText = "54";
}

//Show the position of clicking on the My Location icon

function showmylocation(e) {
  e.preventDefault();
  function showlocation(position) {
    let latitude = position.coords.latitude;
    console.log(latitude);
    let longitude = position.coords.longitude;
    let lolafix = `lat=${latitude}&lon=${longitude}`;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${lolafix}&appid=${apiKey}&units=${units}`;
    function apimyloc(response) {
      let temp = Math.round(response.data.main.temp);
      let city = response.data.name;
      tempElement.innerText = `${temp}`;
      selectLocation.innerText = `${city}`;
    }
    axios.get(apiUrl).then(apimyloc);
  }
  navigator.geolocation.getCurrentPosition(showlocation);
}
