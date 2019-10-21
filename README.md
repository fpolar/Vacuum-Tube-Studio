Vacuum Tube Studio (POC)
=========================

This project came about when a group of friends wanted to play pictionary together, without having to leave the couch.

I developed it with games like jackbox's drawful in mind, but I wanted to give even more freedom to the players
with control over their drawings and their friends drawings. 
That simple mechanic can create a collaborative or competitive environment, but it's fun every time.


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


Playing the game
-----------------

- After following the instructions above, all players/plainters can tap the screen to start the game
- One player is assigned as the guesser and the others are painters
- The painters must try their best to draw the word shown at the top of their device
  - They can tap their emoji/icon to move their drawing position on the canvas using tilt controls,
    This means they can move over other peoples drawings and add on to them or sabotage them
- Those drawings will appear on the host/tv and the guesser will have to look at that to guess the word out loud
- Once the guesser gets the word, they can select on their screen which player(s) had the best drawings
- All players the guesser selects receive a point, and then a new round of that same loop starts


Changing the Dictionary
------------------------

- Currently the dictionary of words the game will chose from are stored as an array at the top of the Room.ts file,
  change that array to change the dictionary
- There is a txt file system in development to make using custom dictionaries easier

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

