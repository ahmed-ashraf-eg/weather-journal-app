// Personal API Key for OpenWeatherMap API
const APIKey = 'ec98c035cc7b850bf8868c65b3b8eaa5';
// Event listener to add function to existing HTML DOM element
const button = document.querySelector("#generate")
button.addEventListener("click", generate)
/* Function called by event listener */
const zip = document.querySelector("#zip")
async function generate () {
    const zip = document.querySelector("#zip").value;
    const data = await getData(zip, APIKey, "metric")
    console.log(data)
    postData("http://localhost:3000/all", data)
}
/* Function to GET Web API Data*/
async function getData (zip, key, unit) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=${unit}`)
    try {
        const newData = await response.json();
               return newData
      }catch(error) {
      console.log("error", error);
      }
}
/* Function to POST data */
async function postData (url, data) {
   await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
   })
}

/* Function to GET Project Data */