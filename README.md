Vacuum Tube Studio (POC)
=========================

This version of VTS is a simple UI for a host and multiple clients that allows mobile devices to paint on a digital canvas on the host computer using tilt or touch controls.

Background
----------
This project is meant meant to be a proof of concept,
to determine if it was possible to create an application that can utilize the motion sensors on 
modern mobile devices to turn the device into a digital paintbrush. 

The idea was that the site would be loaded onto a machine on a TV or monitor, 
and the same site would be loaded onto a mobile device and the user would move the mobile device near the TV
as if they were painting on it and the canvas element on the TV would render drawings where the user painted.

The goal was to use this application to play pictionary or charades style games, which is why there are 
variables like 'player' or 'score' and why the players are defined by emojis.

The accelerometer readings were very noisy and this led to innacurate renderings of the users motion,
so I determined that using the phone exactly like a paintbrush is not yet possible.

Therefore I reworked the project into a series of WarioWare-style micro games, [VTS](https://github.com/fpolar/VTS), that require less acuracy from the 
accelerometer and use the gyrometer for drawing and other simple activities


Running The Project
-------------------

- Download [nodejs](https://nodejs.org/en/)
- Clone the project
- In the command line or terminal:
  - navigate into the project folder
  - run `npm install`
  - run `npm start`
  - paste the ngrok url provided in the terminal into any web browser
    - On desktops, laptops, or smartTVs, click the button with the canvas emoji to enter a room as a host/canvas
    - On mobile devices, tap the button with the brush emoji to enter a room as a painter/player


TODO
-------------------

- To make sure scale of drawing on phone is the same as drawing on canvas, give players a random position on the canvas(maybe this is just done on front end, phone dimensions passed through player object in room onjoin) where all their stuff is proportionately drawn
  - Client Side Changes
    - make canvas full screen
    - emoji/player tag in top left of screen, to orient user to their canvas position
    - touching the emoji enables tilt controls to move the devices position on the canvas
  - Host side changes
  	- no more player tag across the bottom
  	- player tags/emojis are show on the canvas at their position 

- have a button/make user hold down on the canvas or their icon to draw when on tilt mode

- Tapping on the player tag changes your emoji and color

- try removing all jquery, it may be unnecessary
