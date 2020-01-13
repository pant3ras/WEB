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
