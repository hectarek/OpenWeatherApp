
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

//Days 
let day2day = document.getElementById('day-two-day');
let day3day = document.getElementById('day-three-day');
let day4day = document.getElementById('day-four-day');


//headings that turn into temps
let currently = document.getElementById('current-temp-degrees')
let feelsLike = document.getElementById('feelslike-temp-degrees')

//humidity
let humidity = document.getElementById('humidity')

//temps for three day forecast
let day2HightTemp = document.getElementById('day-two-high-temp')
let day2LowTemp = document.getElementById('day-two-low-temp')
let day3HighTemp = document.getElementById('day-three-high-temp')
let day3LowTemp = document.getElementById('day-three-low-temp')
let day4HighTemp = document.getElementById('day-four-high-temp')
let day4LowTemp = document.getElementById('day-four-low-temp')

//Location 
let currentLocation = document.getElementById('current-location');

//conditions for 3 days 
let currentCondition = document.getElementById('current-condition')
let day2Condition = document.getElementById('day-two-condition')
let day3Condition = document.getElementById('day-three-condition')
let day4Condition = document.getElementById('day-four-condition')

//Icons
let currentConditionIcon = document.getElementById('current-condition-icon')
let day2ConditionIcon = document.getElementById('day-two-condition-icon')
let day3ConditionIcon = document.getElementById('day-three-condition-icon')
let day4ConditionIcon = document.getElementById('day-four-condition-icon')

//Icon Comparison Chart 
const weatherIconsComparison = {
    "Clear": 'fas fa-sun fa-3x',
    "Clouds": 'fas fa-cloud fa-3x',
    "Drizzle": 'fas fa-cloud-rain fa-3x',
    "Rain": 'fas fa-cloud-showers-heavy fa-3x',
    "Thunderstorm": 'fas fa-bolt fa-3x',
    "Snow": 'fas fa-snowflake fa-3x',
    "Mist": 'fas fa-smog fa-3x'
}

//Degrees Button changers
let fDegreesButton = document.getElementById('F-degrees-button')
let cDegreesButton = document.getElementById('C-degrees-button')


zipButton.addEventListener('click', () => {

    let input = zip.value.trim();

    const api = `https://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=554b954c4498dd6dcea9fa6a913c29b3`

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
        currentCondition.textContent = data.weather[0].description
        currentLocation.textContent = data.name;
        currentConditionIcon.className = weatherIconsComparison[data.weather[0].main]
        humidity.textContent = data.main.humidity + '%'

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

            //Time from timezone and add days
            currentTime.textContent = ( moment().tz(timeZone).format('dddd') + ', ' + moment().tz(timeZone).format('hh:mm a') )
            day2day.textContent = moment().tz(timeZone).add(1, 'd').format('dddd')
            day3day.textContent = moment().tz(timeZone).add(2, 'd').format('dddd')
            day4day.textContent = moment().tz(timeZone).add(3, 'd').format('dddd')


            //Change temps for forecast
            day2HightTemp.textContent = degreesKtoF(data.daily[1].temp.max) + '°F';
            day2LowTemp.textContent = degreesKtoF(data.daily[1].temp.min) + '°F';
            day3HighTemp.textContent = degreesKtoF(data.daily[2].temp.max) + '°F';
            day3LowTemp.textContent = degreesKtoF(data.daily[2].temp.min) + '°F';
            day4HighTemp.textContent = degreesKtoF(data.daily[3].temp.max) + '°F';
            day4LowTemp.textContent = degreesKtoF(data.daily[3].temp.min) + '°F';
    
            //display the condition for each day
            day2Condition.textContent = data.daily[1].weather[0].description
            day3Condition.textContent = data.daily[2].weather[0].description
            day4Condition.textContent = data.daily[3].weather[0].description

            //Change icons for the different weather
            day2ConditionIcon.className = weatherIconsComparison[data.daily[1].weather[0].main]
            day3ConditionIcon.className = weatherIconsComparison[data.daily[2].weather[0].main]
            day4ConditionIcon.className = weatherIconsComparison[data.daily[3].weather[0].main]
            

        })

    })
  
})
  

cityStateButton.addEventListener('click', () => {
    
    let cityInput = city.value.trim();
    let stateInput = state.value.trim();

    const proxy = "https://cors-anywhere.herokuapp.com/"

    const api = `${proxy}https://www.zipcodeapi.com/rest/NoPzgbEGbMfKF0CGk07ggG52lXZ8t2NNfS2DMHMEYfdOfHEUxh8UzGH0JKqO01ZM/city-zips.json/${cityInput}/${stateInput}`

    fetch(api)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data.zip_codes[0])
    })

})

geoLocateButton.addEventListener('click', () => {
    
    let lat, long

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=554b954c4498dd6dcea9fa6a913c29b3`

            console.log(api)
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
            })

        })
    }
})

