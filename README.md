# Intro

This is the initial version of my JS implementation of an HTTP endpoint to control the [Pimoroni Unicorn pHat](https://shop.pimoroni.com/products/unicorn-phat), as found in the [mood light kit](https://shop.pimoroni.com/products/mood-light-pi-zero-w-project-kit).

Inspiration was taken from [this blog post](https://www.jimbobbennett.io/let-your-family-know-you-are-in-meetings-with-an-iot-busy-light/)

# Installation

Once the pHat is installed on the Raspberry Pi and is connected to the network, ssh into it. you will need Node.js and python installed.

> ### Note
>
> In the docs for the Unicorn pHat it states that you must run the process as root for the lights to work

1. You will need to clone this repository to your raspberry pi.
2. You need to install the node modules using

```
npm i
```

3. You will need to globally install pm2 using

```
npm i -g pm2
```

4. You need to install the python libraries for the unicorn pHat using

```
curl https://get.pimoroni.com/unicornhat | bash
```

#### That is the installing of the 3rd party parts done, now it is time to configure pm2 to reload the node server if the pi looses power

1. su up to root using

```
sudo su
```

2. start the server using pm2

```
pm2 start app.js
```

3. add pm2 to the list of applications that launch on start

```
pm2 startup systemd
```

take the outputted command and run it

```
# example output
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```

```
# run this
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```

4. finally run

```
pm2 save
```

## to add the running application to the list of applications pm2 will start when it is started up

PM2 set up thanks to [this blog post](https://dev.to/bogdaaamn/run-your-nodejs-application-on-a-headless-raspberry-pi-4jnn)
