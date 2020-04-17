
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

//headings that turn into temps
let currently = document.getElementById('current-temp-degrees')
let feelsLike = document.getElementById('feelslike-temp-degrees')


zipButton.addEventListener('click', () => {

    let input = zip.value.trim();

    const api = `http://api.openweathermap.org/data/2.5/weather?zip=${input},us&appid=554b954c4498dd6dcea9fa6a913c29b3`
    const api3Day = `https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&appid=554b954c4498dd6dcea9fa6a913c29b3`

    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        // console.log(moment().tz(data.timezone).format('hh:mm'))
        currently.textContent = degreesKtoF(data.main.temp) + '°F' ;
        feelsLike.textContent = degreesKtoF(data.main.feels_like) + '°F';

    })

    fetch(api3Day)
    .then(response =>{
        return response.json();
    })
    .then(data => {
        console.log(data)
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

