// Personal API Key for OpenWeatherMap API
const APIKey = 'ec98c035cc7b850bf8868c65b3b8eaa5';

// Event listener to add function to existing HTML DOM element
const button = document.querySelector("#generate")
button.addEventListener("click", generate)

/* Function called by event listener */
const zip = document.querySelector("#zip");
async function generate () {
    const zip = document.querySelector("#zip").value;
    const feeling = document.querySelector("#feelings").value;
    const data = await getData(zip, APIKey, "metric")
    const projectData = {
        temp: data.main.temp,
        time:  new Date(data.dt * 1000),
        feeling: feeling
    }  
    await postData("http://localhost:3000/all", projectData)
    .then(updateUI())
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

async function getStorage (url) {
    return await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

/* Dynamic UI  */

async function updateUI () {
    const response = await getStorage("http://localhost:3000/all")
    try {
        const storedData = await response.json();
        const date = document.querySelector("#date");
        const temp = document.querySelector("#temp");
        const feeling = document.querySelector("#content");

        date.innerHTML = storedData.time
        temp.innerHTML = storedData.temp
        feeling.innerHTML = storedData.feeling
      }catch(error) {
      console.log("error", error);
      }
    
    
    /* response = await response.json()
    return response */
}