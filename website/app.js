let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&units=imperial&APPID=8309e1c431dc438135de55ca6993235a';

document.getElementById('generate').addEventListener('click', performAction);

// function initiated by event listerner when the generate button is clicked
function performAction(e){
  // Create a new date instance dynamically with JS
  let d = new Date();
  let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear()+ '    ' + d.getHours()+ ':' + String(d.getMinutes()).padStart(2, "0");

  // retrieves entered zip and entered text from app
  const zip =  document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // function that gets passed url/zip/and api key to retrieve weather
  getWeather(baseURL, zip, apiKey)
  .then(function(data){

    // posts data to server.js
    postData('/addPost', {
      loc: data.name,
      temperature: data.main.temp,
      date: newDate,
      feel: feelings})
  })
  .then(function(){

    // retrieves stored data from server.js
    getPost('/all')
  })
};
// fetches data from API
const getWeather = async (baseURL, zip, key)=>{
  const res = await fetch(baseURL+zip+key)
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
    // posts data to server.js
const postData = async (url = '', data = {})=>{
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    console.log('itWorked!');
    return newData;
  }catch(error) {
    console.log('error', error);
  }
}
// retrieves stores data from server.js and updates UI
const getPost = async (url = '')=>{
  const res = await fetch(url)
  try {
    const postData = await res.json();
    const newDiv = document.createElement('div');
    const adjDiv = document.getElementById('title');
    adjDiv.insertAdjacentHTML('afterend',
      ` <br>
        <div id = "entryHolder">
        <div id= "dateTemp">
          <div id = "date"></div>
          <div id = "temp"></div>
        </div>
        <hr>
        <div id = "content"></div>
       </div>`);
    const addStyle = document.getElementById('entryHolder').style.cssText = "background-color: #c4c4c4; width: 95%; padding: 5px; margin: auto; border-radius: 5px;"
    const feeling = postData[0].feel;
    const temp = postData[0].temperature.toFixed(0);
    const date = postData[0].date;
    const location = postData[0].location;
    document.getElementById('date').textContent = date;
    document.getElementById('temp').textContent = location + "'s Current Temperature is: " + temp + " degrees F";
    document.getElementById('content').textContent = "Today I am feeling.... " + feeling;
    return postData;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
