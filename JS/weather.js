
//to get the checked on the element
// Get the <datalist> and <input> elements.
var dataList = document.getElementById('loadLocation');
var input = document.getElementById('weatherLoc');
const key = "2KDWySK21wOdCQFdIUc7MifUMQyo841L";
var getLocation = document.getElementById('weatherLoc').value;
var length = getLocation.length

function loadLocations() {
// Create a new XMLHttpRequest.
if (event.which == 13 || event.keyCode == 13) {
    if(getLocation === ''){
        getLocation = document.getElementById('weatherLoc').value;
    }
var request = new XMLHttpRequest();

// Handle state changes for the request.
request.onload = function(response) {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      
          data.forEach(search => {
          locationID = `${search.Key}`;
         // console.log(locationID);
          locationName = `${search.LocalizedName}`
         locationCounty = `${search.AdministrativeArea.LocalizedName}`
      //   console.log(locationCounty);
         

        //  console.log(locationName);
          var option = document.createElement('option');
          // Set the value using the item in the JSON array.

          option.value = locationName + ', ' + locationCounty;

          // Add the <option> element to the <datalist>.
          dataList.appendChild(option);
      })   
      //locationID = `${search.Key}`;
     // console.log(locationID)
    }  
      else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading options...";

// Set up and make the request.
//request.open('GET', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/4621/html-elements.json', true);
request.open('GET', 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey='+key+'&q='+getLocation, true); //{cityName}

request.send();
getLocation = ''
}

//key: https://api.openweathermap.org/data/2.5/weather?q=London&APPID=adc1e779a638accdfece1b15ec1c7bfe
//key accuweather: B7qedIDZVMbC0l3QrP5CabjwpWbV3zGf


//const key = "2KDWySK21wOdCQFdIUc7MifUMQyo841L";
const app = document.getElementById('content')
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)


function locations(){
/*if (getLocation === '') {
    alert("Write something in the textbox!!!")
}*/
var locationID;
var li = document.createElement("li");
var getLocation = document.getElementById('weatherLoc').value;
//getLocation
var t = document.createTextNode(getLocation);
li.appendChild(t);
var request = new XMLHttpRequest();
request.open('GET', 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey='+key+'&q='+getLocation.substr(0,getLocation.indexOf(' ')-1), true); //{cityName}
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
        data.forEach(search => {
        locationID = `${search.Key}`;
       
        locationCounty = `${search.AdministrativeArea.LocalizedName}`
   
        locationName = `${search.LocalizedName}`

          var option = document.createElement('option');
          // Set the value using the item in the JSON array.

          option.id = locationID

          // Add the <option> element to the <datalist>.
          dataList.appendChild(option);
       // console.log(locationID + ' '+ locationName + ' ' + locationCounty);

    })     
       // if (locationCounty == getLocation.substr(getLocation.indexOf(',')-1, getlocation.length)) {
            // data.forEach(search => {
            //     locationID = `${search.Key}`
            //     console.log(locationID + 'oare/')
            // })
        //}
    }
    else {
   
    //console.log(`Location not found or something not provided!`);

  }
 // console.log(locationID);
  var request2 = new XMLHttpRequest();
  request2.open('GET', 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+locationID+'?apikey='+key+'&metric=true', true); //{cityName}
  request2.onload = function() {
      var data2 = JSON.parse(this.response);
      if (request2.status >= 200 && request2.status < 400) {
         /* data2.forEach(location => {*/
            locationText = `${data2.Headline.Text}`;
           /* console.log(locationText);*/
            
            const details = document.createElement('div');
            details.setAttribute('class', 'details');
            
            node = `${data2.Headline.MobileLink}`
          //  console.log(node);
              const h1 = document.createElement('h1');
                category = `${data2.Headline.EndEpochDate}`
                h1.textContent = locationName

               // minTemp = `${data2.DailyForecasts.Date}`

              //console.log(minTemp)

               const p = document.createElement('p'); 
               p.textContent = `In `+getLocation + ' will be ' + locationText.toLowerCase();
                const temp = document.createElement('p');
                temp.textContent = 'More details at: ' + node
            container.appendChild(details);
            details.appendChild(h1);
            details.appendChild(p);
            details.appendChild(temp);
         /* })*/
      }

      else {
   
        console.log(`Gah, it's not working the second call! - may not found the location`);
    
      }
  
  }
  request2.send();  
 }

request.send();

}
