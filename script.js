
// ==== NASA APOD | API KEY: sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz
let date = new Date();
let imageDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

// Fetch API
fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&date=' + imageDate + '&thumbs=True')
  .then(function (response){  //JS promise structure and response
    return response.json()    //Return data
})
.then(function (imageData){   //JSON data captured in this parameter
  
  // console.log(imageData)   //display image data for debug purposes

  if (imageData.media_type === 'video') { 
    
    //If the photo is a video, use placeholder
    document.querySelector('p').textContent = 'APOD is a video'

    // Else Continue
  } else { 

    // Set Div Background Image
    document.getElementById('bg-img').style.backgroundImage = 'url(' + imageData.hdurl + ')';
  
    // Contents of More Info Block
    let $imginfo = document.getElementById('extra-data');
    $imginfo.innerHTML = 
    (`<div class="container">
        <div class="row">
          <div class="datablock col"><h2>Image Title</h2><p>` + imageData.title + ` by ` + imageData.copyright + `</p></div>

          <div class="w-100"></div>
          <div class="datablock col"><h2>Image Description</h2><p>` + imageData.explanation + `</p></div>

        </div>`);
  }
})





// ==== Settings | Show Seconds ====

// Select Input
let $checkbox = document.querySelector("input[name=seconds]");

// ===== IF PREVIOUS DATA EXIST =====
if (localStorage.getItem('checkboxstatus') !== null) {

  // Log Status
  console.log('== Previous Data Found ==');

  // Destring Data
  let tempObject = JSON.parse(localStorage.getItem('checkboxstatus'));

  // Log Data Found
  console.log('Past Setting is', tempObject.Checkbox);

  // Checkbox Value = old object value
  $checkbox.value = tempObject.Checkbox;

} 
  
// If Checkbox Value = On |  Checkbox Checked
if ( ($checkbox.value) === 'on' ) {
  $checkbox.checked = true;
} 

// Else If Checkbox Value = Off |  Checkbox Unchecked
else if ( ($checkbox.value) === 'off' ){
  $checkbox.checked = false;
}


// Event Listener |  When Checkbox Toggled
$checkbox.addEventListener('change', function() {

  // If Checked | Value = on
  if ($checkbox.checked) {
    $checkbox.value = 'on'
  } 
  
  // If Not | Value = off
  else {
    $checkbox.value = 'off'
  }

  // ====== Store Setting | Local Storage =======

  // Local Storage | Store Data
  const objectDataToStore = {
    Checkbox: $checkbox.value,
  };

  // Store Info Under 'checkbox', Convert to string
  localStorage.setItem('checkboxstatus', JSON.stringify(objectDataToStore));

});







// ==== Live Clock ====

// Data
const $timer = document.getElementById('time');
const $date = document.getElementById('date');


// Start Clock
let clock = setInterval(function clockStart () {

// currentDate = Current Date/Time
let currentDate = new Date();

// Set's Default Time Format
$date.innerHTML = (`<h1>${currentDate.toDateString()}</h1>`);

// If setting on, show seconds. Otherwise, don't.
if ($checkbox.value === 'on'){
  $timer.innerHTML = (`<h1 class='intergers'>${currentDate.toLocaleTimeString()}</h1>`);
} else if ($checkbox.value === 'off'){
  $timer.innerHTML = (`<h1 class='intergers'>${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>`);
}




// = Greeting Depending on Time =

let motd = document.getElementById('motd');

// If past 12am and before 12pm
if ((date.getHours() >= 0) && (date.getHours() < 12) ) {
  motd.innerHTML = '<h1>Good Morning!</h1>';
} 

// If past 12pm and before 6pm
else if ((date.getHours() >= 12) && (date.getHours() < 18) ) {
  motd.innerHTML = '<h1>Good Afternoon!</h1>';
} 

// If past 6pm
else if ((date.getHours() >= 18) && (date.getHours() <= 23) ) {
  motd.innerHTML = '<h1>Good Evening!</h1>';
} 

// Tick Rate
}, 0, 1000);






// ==== Settings Button Integration ====

// Data
const $settingsButton = document.getElementById('settings');
const $togcontent = document.getElementById('settingblock');

// Click Event Listener
$settingsButton.addEventListener('click', function (e) {

  // Target Button
  let $selectedInput = e.target.closest('.togglebutton');

  // If Present
  if ($selectedInput){

    // Toggle Display Classes
    $togcontent.classList.toggle("dnone");
    $togcontent.classList.toggle("dblock");

  }
});



// ==== More Info Button Integration ====
// Data
const $infoButton = document.getElementById('infotog');
const $infoCont = document.getElementById('infoblock');

// Click Event Listener
$infoButton.addEventListener('click', function (e) {

  // Target Button
  let $selectedInput = e.target.closest('.togglebutton');

  // If Present
  if ($selectedInput){

    // Toggle Display Classes
    $infoCont.classList.toggle("dnone");
    $infoCont.classList.toggle("dblock");

  }
});


