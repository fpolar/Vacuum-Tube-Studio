Vacuum Tube Studio
===================

Meant as a proof of concept to determine if it was possible to create an application that can utilize the motion sensors on 
modern mobile devices to turn the device into a digital paintbrush. 

The idea was that the site would be loaded onto a machine on a TV or monitor, 
and the same site would be loaded onto a mobile device and the user would move the mobile device near the TV
as if they were painting on it and the canvas element on the TV would render drawings where the user painted.

The goal was to use this application to play pictionary or charades style games, which is why there are 
variables like 'player' or 'score' and why the players are defined by emojis.

The accelerometer readings were very noisy and this led to innacurate renderings of the users motion, 
but the gyroscope was fairly accurate.
So I reworked the project into a series of WarioWare-style micro games [include link to other repo]() that require less acuracy from the 
accelerometer and use the gyrometer for drawing simple things


Running The Project
------------

- Download [nodejs](https://nodejs.org/en/)
- Clone the project
- In the command line or terminal:
  - navigate into the project folder
  - run `npm install`
  - run `npm start`

