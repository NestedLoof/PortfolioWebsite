---
title: Hungry Bunny
description: 2D arcade-style survival game.
layout: project.njk
date: 2024-04-05
tags: 
- PlayBuffer
- C++
thumbnail: /images/HungryBunnyScreenshot.png
---

https://github.com/NestedLoof/HungryBunny

## Technologies Used

- PlayBuffer
- C++


The development process was to pick up a high priority development that wouldn't tread on the toes of anyone else whenever you finish the previous task.
This meant that because I worked through my developments quite quickly, I ended up writing most of the game.
However, I still asked for opinions when writing part of a feature that wasn't specified in the planning stage.
The whole time I was also helping others with their developments and various technical issues. e.g. helping resolve conflicts on Perforce, and fix bugs with playing sounds and drawing health bars.


## My Contributions

Audio:

    Trimmed some of the sounds to be the correct length (e.g. cut gap before popping sound so it synced with vegetables appearing) (e.g. edited the countdown timer to a single beep to play at any frequency we want.)
    Sourced the menu button click, collecting carrot/increase score and watering can sound effects.
    Implemented the ambient nature sounds, background music, health warning beeps, collecting carrot/add score sound, watering can sound and menu button sounds.

Health bar:

    Built on Pei's original health bar by making the health depletion depending on the current action (e.g. running depletes faster than walking).
    Made the health bar flash slowly below a 1/3 health, then faster below 1/6 health.
    Made the health gained from each vegetable reduce slowly as you eat more, so the game gets more difficult the higher your score is. The cabbage and carrots follow the exponential decay curves in the following image 
    
<img src="images/decaygraphs.png" alt="Health regen graph">

Characters:

    Added the bunny main character with controls. WASD or arrow keys for movement, shift to run, space to water. Animated to match.
    Added the farmer, with a simple randomly controlled AI that can shoot and run around.
    Made the farmer rotate to face the bunny, up to a min/max angle on each side so you can try to stay below or above him to avoid being shot on the easier levels.
    Normalised the farmer's speed.
    Wrote the bullets functionality, with both a small random range in angles for a single burst of bullets, and a multishoot mechanism that first 2 additional bursts at 45 degrees either way.
    Added the additional farmer for hungry mode.
    For both characters, they are locked in place when performing their action (planting flowers or shooting) until the animation ends.

Flowers:

    Added spawning flowers by hitting space. Flowers spawn in after the watering can animation has finished and can block bullets.
    Made the number of flowers spawned in variable, so on easy you get 7, medium 5, etc. All flowers will spawn between 45 degrees either side of where you are facing with even separation.
    Added max number of flowers to prevent lag or making the game too easy by spamming them. When adding new flowers, it destroys the oldest flowers.
    When drawing the flowers on screen, it draws the ones at the back first so they are layered correctly.


High Scores:

    Added high scores so when you game over, the score is written to the relevant difficulty score file, as long as it is one of the top 5 scores.
    Added a menu screen for high scores that displays the top 5 scores for the current difficulty.

Menus:

    Developed all of the menus in the game, including the start menu, game over screen and high scores screen
    Developed buttons with haptic feedback for each of the menus. When pressing down on a button both the text and button background change, but the button is only clicked once the button is released.


Carrots:

    Finished off Pei's carrot spawning code to randomly pick a plot number, then a tile within the plot and a random position within that tile when spawning in carrots.
    Added the ability to eat carrots and have them respawn
    Mapped out all of the plots for the level


Environment:

    Developed a way to make the characters collide with things that are just part of the background by creating invisible objects with collision.
    Prevented the characters from leaving the window or running over fences and water.

Game Balancing:

    Added difficulty levels to make the game more accessible, with a sense of progression and a fun challenge for more experienced players.
    Added some varied mechanics across difficulties such as the farmer shooting multiple bursts at different angles, and spawning flowers in a circle around you rather than just in front.
    Balanced by adjusting the max health, health regeneration, character movement speeds, watering/shooting animation speeds, bullet speed and angles, farmer action frequency, number of flowers spawned, carrot decay speed and max number of carrots.


Code stuff:

    Added global variables for every part of the game we might want to centrally change, such as run/walk speeds, animation speeds, max numbers of objects, etc.
    Refactored methods
    Split out code into multiple files
    Optimised some of the existing code to avoid lag
    Created a new utility method for drawing fonts on the screen with a scale so it can easily be resized in the code.
