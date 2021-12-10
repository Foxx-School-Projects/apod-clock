
// ==== NASA APOD ASSIGNMENT ====

// API KEY: sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz

let date = new Date();

let imageDate = (date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());

console.log('Date is', imageDate)

fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&date=' + imageDate + '&thumbs=True')
  .then(function (response){ //JS promise structure is returned and caputed in response parameter
    return response.json() //Return data in JSON format when available
})
.then(function (imageData){ //JSON data captured in this parameter
  // console.log(imageData) //display incoming data for debug purposes

  if (imageData.media_type === 'video') { //If the photo is a video, use placeholder
    document.querySelector('p').textContent = 'APOD is a video'
  } else { //otherwise set src of image to photo url 

    console.log('image url:', imageData.hdurl)

    document.getElementById('bg-img').style.backgroundImage = 'url(' + imageData.hdurl + ')';
  }

})