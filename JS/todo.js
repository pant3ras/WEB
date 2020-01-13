
//getDate method
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

function todayDate() {
  var d = new Date();
  var n = d.getDate();
}



// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item var list = document.querySelector('ul');

var list = document.getElementById("myUL");
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


// Create a new list item when clicking on the "Add" button
function newLocation() {
  
  var li = document.createElement("li");
  var a = document.createElement("a");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  var linkText = document.createTextNode(" -- > see weather for this location");

  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);

  a.appendChild(linkText);

  a.href = "weather.html" ;

  document.body.appendChild(a);
  
  li.appendChild(span);
  li.appendChild(a);
  itemsArray.push(inputValue)
  localStorage.setItem('items', JSON.stringify(itemsArray))

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  }

function newDate() {
  var li = document.createElement("li");
  var addDate = document.getElementById("addDate");
  var dateVal = document.getElementById("start").value;

  var t = document.createTextNode(dateVal);
  li.appendChild(t);
  if (dateVal === '') {
    alert("You must select a date!!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  /*
  itemsArray.push(dateVal)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  data.forEach(item => {
    liMaker(item)
  })*/
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

function otherList(){
  const form = document.querySelector('section')
  const ul = document.querySelector('ul')
  const button = document.querySelector('button')
  const input = document.getElementById('myInput')
  let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []

  localStorage.setItem('items', JSON.stringify(itemsArray))
  const data = JSON.parse(localStorage.getItem('items'))

  const liMaker = text => {
    const li = document.createElement('li')
    li.textContent = text
    ul.appendChild(li)
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault()
  
    itemsArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    liMaker(input.value)
    input.value = ''
  })
  
  data.forEach(item => {
    liMaker(item)
  })
  
  button.addEventListener('click', function() {
    localStorage.clear()
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild)
    }
  })
}
