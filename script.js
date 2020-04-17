
// Functions to make K to F and C
function degreesKtoF(num) {
    return Math.floor( (num - 273) * (9/5) + 32)
}

function degreesKtoC(num) {
    return num - 273;
}

//HTML Elements

//Buttons
const zipButton = document.getElementById('zipButton');
const cityStateButton = document.getElementById('cityStateButton')
const geoLocateButton = document.getElementById('geoLocateButton')

//Input boxes
let zip = document.getElementById('zip');
let city = document.getElementById('city');
let state = document.getElementById('state');

//Time Heading
let currentTime = document.getElementById('current-time-header')

//headings that turn into temps
let currently = document.getElementById('current-temp-degrees')
let feelsLike = document.getElementById('feelslike-temp-degrees')

//temps for three day forecast
let day2HightTemp = document.getElementById('day-two-high-temp')
let day2LowTemp = document.getElementById('day-two-low-temp')
let day3HighTemp = document.getElementById('day-three-high-temp')
let day3LowTemp = document.getElementById('day-three-low-temp')
let day4HighTemp = document.getElementById('day-four-high-temp')
let day4LowTemp = document.getElementById('day-four-low-temp')

//Location 
let currentLocation = document.getElementById('location-current');

//conditions for 3 days 
let currentCondition = document.getElementById('current-condition')
let day2Condition = document.getElementById('day-two-condition')
let day3Condition = document.getElementById('day-three-condition')
let day4Condition = document.getElementById('day-four-condition')


zipButton.addEventListener('click', () => {

    let input = zip.value.trim();

    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${input},us&appid=554b954c4498dd6dcea9fa6a913c29b3`

    //fetch weather data from api
    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        //Change city, condition and temps for current
        currently.textContent = degreesKtoF(data.main.temp) + '°F' ;
        feelsLike.textContent = degreesKtoF(data.main.feels_like) + '°F';
        currentCondition.textContent = data.weather.description
        currentLocation.textContent = data.name;

        let lat = data.coord.lat
        let long = data.coord.lon

        const api3Day = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=554b954c4498dd6dcea9fa6a913c29b3`

        fetch(api3Day)
        .then(response =>{
            return response.json();
        })
        .then(data => {
            console.log(data)

            let timeZone = data.timezone

            //Current Time from timezone
            currentTime.textContent = moment().tz(timeZone).format('hh:mm a')


            //Change temps for forecast
            day2HightTemp.textContent = degreesKtoF(data.daily[1].temp.max) + '°F';
            day2LowTemp.textContent = degreesKtoF(data.daily[1].temp.min) + '°F';
            day3HighTemp.textContent = degreesKtoF(data.daily[2].temp.max) + '°F';
            day3LowTemp.textContent = degreesKtoF(data.daily[2].temp.min) + '°F';
            day4HighTemp.textContent = degreesKtoF(data.daily[3].temp.max) + '°F';
            day4LowTemp.textContent = degreesKtoF(data.daily[3].temp.min) + '°F';
    
            day2Condition.textContent = data.daily[1].weather[0].description
            day3Condition.textContent = data.daily[2].weather[0].description
            day4Condition.textContent = data.daily[3].weather[0].description
        })

    })

    

  
})
  
cityStateButton.addEventListener('click', () => {
    
    let cityInput = city.value.trim();
    let stateInput = state.value.trim();

    const api2 = `https://www.zipcodeapi.com/rest/NoPzgbEGbMfKF0CGk07ggG52lXZ8t2NNfS2DMHMEYfdOfHEUxh8UzGH0JKqO01ZM/city-zips.json/${cityInput}/${stateInput}`

    fetch(api2)
    .then(data => {
        console.log(data)
    })

})



// sdf.addEventListener('click', () => {
    
//     let lat, long

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(position => {
//             lat = position.coords.latitude;
//             long = position.coords.longitude;

//             const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=554b954c4498dd6dcea9fa6a913c29b3`

//             fetch(api)
//             .then(response => {
//                 response.json();
//             })
//             .then(data => {
//                 console.log(data)
//             })

//         })
//     }
// })

