const ledController = require('rpi-ws281x-native');
const express = require('express');

const PORT = 80;
const app = express();
const NUMBER_OF_LEDS = 32; // 32 leds in the Unicorn pHat

ledController.init(NUMBER_OF_LEDS);
ledController.setBrightness(255); // A value between 0 and 255

// The RGB colours of the LEDs. for instance 0xff0000 is red, 0x0000ff is blue, etc.
const pixelData = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

ledController.render(pixelData);

function changeAll(r, g, b) {
    pixelData.map((x, i) => pixelData[i] = rgb2Int(r, g, b));
    ledController.render(pixelData);
}

app.get('/simon/dnd', (req, res) => {
    changeAll(255, 0, 0);
    res.sendStatus(200);
})

app.get('/simon/busy', (req, res) => {
    changeAll(255, 211, 0);
    res.sendStatus(200);
})

app.get('/simon/free', (req, res) => {
    changeAll(0, 255, 0);
    res.sendStatus(200);
})

app.get('/party', (req, res) => {
    const old = [...pixelData];
    let offset = 0;
    const intervalId = setInterval(function () {
        for (var i = 0; i < NUMBER_OF_LEDS; i++) {
            pixelData[i] = colorwheel((offset + i) % 256);
        }

        offset = (offset + 1) % 256;
        ledController.render(pixelData);
    }, 1000 / 30);

    setTimeout(() => {
        clearInterval(intervalId);
        ledController.render(old)
    },60*60*30)

    res.sendStatus(200);
})

app.get('/kayleigh', (req, res) => {
    res.sendStatus(200)
})

app.get('/reset', (req, res) => {
    changeAll(0, 0, 0);
    res.sendStatus(200)
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

function colorwheel(pos) {
    pos = 255 - pos;
    if (pos < 85) { return rgb2Int(255 - pos * 3, 0, pos * 3); }
    else if (pos < 170) { pos -= 85; return rgb2Int(0, pos * 3, 255 - pos * 3); }
    else { pos -= 170; return rgb2Int(pos * 3, 255 - pos * 3, 0); }
}

function rgb2Int(r, g, b) {
    return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
