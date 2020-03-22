var NUMBER_OF_LEDS = 32; // 32 leds in the Unicorn pHat

var ledController = require('rpi-ws281x-native');
ledController.init(NUMBER_OF_LEDS);
ledController.setBrightness(50); // A value between 0 and 255

// The RGB colours of the LEDs. for instance 0xff0000 is red, 0x0000ff is blue, etc.
var leds = [
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0    
];

// Loop every 0.1 sec: randomise an index and a colour and display it
ledController.render(leds);
var interval = setInterval(function() {
    var randomIndex = Math.floor(Math.random() * NUMBER_OF_LEDS);
    var randomColour = Math.floor(Math.random() * 0xffffff);
    leds[randomIndex] = randomColour;
    console.log('Rendering colour ' + randomColour + ' at index ' + randomIndex);
    ledController.render(leds);
}, 100);

// After 10 secondes, stop.
setTimeout(function () {
    console.log('Stop!');
    clearInterval(interval);
    ledController.reset();
}, 10000);
