/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API

const baseURL ='http://api.openweathermap.org/data/2.5/weather?zip=';

const API_key  ='&units=metric&appid=d020cefb33d48e50eff0e9e4db8841fb';

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */

function performAction(e){
  
    const feelings =  document.getElementById('feelings').value;
    const newZip =  document.getElementById('zip');
    const API_URL  =  baseURL+newZip.value+API_key;
  
    getWeather(API_URL)
    // New Syntax!
    .then(function(data){
      // Add data
      console.log(data);
      postData('/AddData', {date:d, temp:data.main.temp, content:feelings} );
    })
    .then(function(){
      updateUI()
  });
}

 
  /* Function to GET Web API Data*/
 
  const getWeather = async (API_URL)=>{

    const response = await fetch(API_URL)
    try {
  
      const data = await response.json();
      console.log(data)
      return data;


    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }

  /* Function to POST data */

  const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};


/* Dynamically Update UI */

const updateUI = async () => {
    const request = await fetch('/all');

    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = `Date is :${allData.date}`;
      document.getElementById('temp').innerHTML = `The temperatuer is : ${allData.temp}`;
      document.getElementById('content').innerHTML = `I feel : ${allData.content}`;
  
    }catch(error){
      console.log("error", error);
    }
  }

