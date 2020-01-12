
//key: https://api.openweathermap.org/data/2.5/weather?q=London&APPID=adc1e779a638accdfece1b15ec1c7bfe
//key accuweather: B7qedIDZVMbC0l3QrP5CabjwpWbV3zGf


const key = "2KDWySK21wOdCQFdIUc7MifUMQyo841L";
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
var t = document.createTextNode(getLocation);
li.appendChild(t);
var request = new XMLHttpRequest();
request.open('GET', 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey='+key+'&q='+getLocation, true); //{cityName}
request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    
        data.forEach(search => {
        locationID = `${search.Key}`;
        console.log(locationID);
        locationName = `${search.LocalizedName}`
        data.forEach(ssss => {
            countryID = `${ssss.AdministrativeArea.LocalizedName}`
            console.log(countryID);
        })
    })     
        
    }
    else {
   
    console.log(`Location not found or something not provided!`);

  }
  console.log(locationID);
  var request2 = new XMLHttpRequest();
  request2.open('GET', 'http://dataservice.accuweather.com/forecasts/v1/daily/1day/'+locationID+'?apikey='+key+'&metric=true', true); //{cityName}
  request2.onload = function() {
      var data2 = JSON.parse(this.response);
      if (request2.status >= 200 && request2.status < 400) {
         /* data2.forEach(location => {*/
            locationText = `${data2.Headline.Text}`;
           /* console.log(locationText);*/
            
            const details = document.createElement('div');
            details.setAttribute('id', 'details');
            
            
        
            node = `${data2.Headline.MobileLink}`
            console.log(node);
/*
            data2.forEach(cat => {
                
                mobileL = `${cat.DailyForecasts.MobileLink}`
                console.log(mobileL);   })
*/              const h1 = document.createElement('h1');
                category = `${data2.Headline.EndEpochDate}`
                h1.textContent = locationName//category
               // cat.Text = `${data2.Headline.MobileLink}`;
               const p = document.createElement('p'); 
               p.textContent = `In `+getLocation + ' will be ' + locationText.toLowerCase();
            
            container.appendChild(details);
            details.appendChild(h1);
            details.appendChild(p);
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