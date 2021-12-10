
// ==== NASA APOD ASSIGNMENT | API KEY: sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz

let date = new Date();
let imageDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

console.log('Image Date is', imageDate)

fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&date=' + imageDate + '&thumbs=True')
  .then(function (response){ //JS promise structure and response
    return response.json() //Return data
})
.then(function (imageData){ //JSON data captured in this parameter
  
  // console.log(imageData) //display image data for debug purposes

  if (imageData.media_type === 'video') { 
    
    //If the photo is a video, use placeholder
    document.querySelector('p').textContent = 'APOD is a video'

  } else { 

    // set src of image to photo url 
    console.log('Image Source:', imageData.hdurl)

    console.log(imageData)

    document.getElementById('bg-img').style.backgroundImage = 'url(' + imageData.hdurl + ')';
  
    let $imginfo = document.getElementById('extra-data');
    $imginfo.innerHTML = 
    (`<div class="container">
        <div class="row">
          <div class="datablock col"><h2>Source</h2>` + imageData.hdurl + `</div>
          <div class="datablock col"><h2>Image Title</h2>` + imageData.title + `</div>
          <div class="w-100"></div>
          <div class="datablock col"><h2>Image Title</h2>` + imageData.title + `</div>
          <div class="datablock col"><h2>Image Author</h2>` + imageData.copyright + `</div>
        </div>`);

  }
  

})




// ==== Live Clock ====

console.log('Loaded time is:', date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) )

const $timer = document.getElementById('time');
const $date = document.getElementById('date');


// Function Ticking Starts
let clock = setInterval(function clockStart () {
let currentDate = new Date();

$timer.innerHTML = (`<h1 class='intergers'>${currentDate.toLocaleTimeString()}</h1>`);
$date.innerHTML = (`<h1>${currentDate.toDateString()}</h1>`);



// Update Greeting Depending on Time

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


}, 0, 1000);


// ==== Settings Button Integration ====

// Click Event Listener
const $settingsButton = document.getElementById('settings');
const $togcontent = document.getElementById('settingblock');

$settingsButton.addEventListener('click', function (e) {

  // Target Button
  let $selectedInput = e.target.closest('.togglebutton');

  // If Present
  if ($selectedInput){

    $togcontent.classList.toggle("dnone");
    $togcontent.classList.toggle("dblock");

  }
});



// ==== Info Button Integration ====

// Click Event Listener
const $infoButton = document.getElementById('infotog');
const $infoCont = document.getElementById('infoblock');

$infoButton.addEventListener('click', function (e) {

  // Target Button
  let $selectedInput = e.target.closest('.togglebutton');

  // If Present
  if ($selectedInput){

    $infoCont.classList.toggle("dnone");
    $infoCont.classList.toggle("dblock");

  }
});