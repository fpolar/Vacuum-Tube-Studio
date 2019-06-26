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
- use just orientation and thick or thin mode to paint from user in one spot

- pictionary meets heads up
- make submit button so guesser can choose to give points to multiple people
- big reveal of word animating towards screen(getting bigger) and fading out

- see if i can remove the player_state parameter from setupround in myroom.ts

- add a button to allow user to save canvas as png (only fire once)
`var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
window.location.href=image;`

- If I make this into a BR, I'm going to have to find a new way to store the word
  or else people could cheat easily with the console

- Users who enter later, risize, or refresh page cannot see the drawings on their client, even
if they're in a spot on the canvas where they should be able to.
  - maybe keep track of all 'dots' drawn so they can be redrawn on join?
  - related to below note

- right now, all clients draw all other clients when signal recieved.
  - check if incoming client signal position is within current clients view, if not dont draw
  - right now this innefficiency isn't causing problems, but I could see it slowing down 
  in the future

- Tilt controls can feel a little awkward because of the small space u can move using it
  - finesse the values to make it feel tighter

- drawing on client side way better than what it sends, fix that 
  - it may just be a speed/latency issue, drawing a little slowly works fine
    - this might be ok, people draw slowly when on mobile
  - sometimes just switching to dots only fixes it for some reason

- small bug, if orientation data sent too early, position of player on canvas isnt set

- have a button/make user hold down on the canvas or their icon to draw when on tilt mode

- after a few draws or after some condition is met, show tips on mobile
  - like a message that tells the user to hit their emoji to move their position on the canvas

- add more customizability of experience to the tool bar
  - a button to show/hide all users boundaries

- add a tool bar to the client side
  - size slider
  - change emoji/color(most likely not let them select, just a randomiztion button)

- try removing all jquery, it may be unnecessary

- use let instead of var when necessary
