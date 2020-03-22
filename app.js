const ledController = require('rpi-ws281x-native');
const express = require('express');

const PORT = 80;
const app = express();
const NUMBER_OF_LEDS = 32; // 32 leds in the Unicorn pHat

ledController.init(NUMBER_OF_LEDS);
ledController.setBrightness(255); // A value between 0 and 255

// The RGB colours of the LEDs. for instance 0xff0000 is red, 0x0000ff is blue, etc.
const leds = [
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0    
];

ledController.render(leds);

function changeAll(colourHex){
    leds.map(x => x = colourHex);
    ledController.render(leds);
}

app.get('/simon', (req, res) => {
    changeAll('#ff0000');
    res.send(200);
})

app.get('/kayleigh', () => {

})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
  

// // Loop every 0.1 sec: randomise an index and a colour and display it
// const interval = setInterval(function() {
//     const randomIndex = Math.floor(Math.random() * NUMBER_OF_LEDS);
//     const randomColour = Math.floor(Math.random() * 0xffffff);
//     leds[randomIndex] = randomColour;
//     console.log('Rendering colour ' + randomColour + ' at index ' + randomIndex);
//     ledController.render(leds);
// }, 100);

// // After 10 secondes, stop.
// setTimeout(function () {
//     console.log('Stop!');
//     clearInterval(interval);
//     ledController.reset();
// }, 10000);
