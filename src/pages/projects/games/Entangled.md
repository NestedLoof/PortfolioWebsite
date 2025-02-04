---
title: Entangled
description: Comedic, narrative-driven couch co-op game.
layout: project.njk
date: 2024-06-28
tags:
- Unreal Engine
- C++
thumbnail: /images/EntangledScreenshot3.png
---

<iframe width="920" height="399" src="https://www.youtube.com/embed/5LZhfvCN7XE" title="Entangled - Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Technologies Used

- Unreal Engine 5
- C++

We used Figma to brainstorm and plan the game, and Plaky for project management to delegate and prioritise tasks.


## My Contributions
Architecture:

Wrote the game mode and game instance architecture in C++, making it flexible enough to work for all levels in the game with lots of customisation options.

 - On starting a level it will play the start dialogue if there is any, then display the instructions widget if there is one, start the minigame if it is a minigame level, etc.

 - Created BlueprintNative and BlueprintCallable functions on the game mode and game instance, such as "EndMinigame" which saves the score and triggers the end dialogue as the default implementation in C++, but can then be overridden in blueprints to do minigame-specific things such as remove widgets.

 - Cleaned up the level progression code, stopping it from crashing UE, moving logic to the game instance to make use of OOP, and simplifying, refactoring and optimising the code around getting the next level.

 - Created the dialogue system using tables of a dialogue data struct, which can be dependent on the rating of a particular minigame and used camera actor tags to switch camera angled between lines. Each new dialogue would fire a delegate so that any custom actions (e.g. animations, sounds, etc) could be done on a particular row of the dialogue table.


Created my own method of doing a couch co-op game in UE. There is no support for splitting player inputs from a single input device (i.e. 2 players on one keyboard). So, in C++ I created a system where any inputs for the second player are activated on the first player's controller, but then forwarded to the second player's character. This meant that the input context mapping needed a second version of each of the input actions with just the keyboard input for the second player. The engine's in-built support worked for 2 controllers, so this just used the first set of input actions in the mapping.

Created the core system in the game mode which always added the second player but only used the camera from the first player. Made it so that the camera view would always switch to my custom made "DynamicCamera" C++ object unless specified otherwise, which would follow both players.

Fixed controller rotation so it's based on player 1's current camera view.


Dynamic Camera:
Made the main camera for the game with customisable parameters such as min/max zoom, buffer zoom (flat addition so it's always a literal extra zoomed out), and booleans for whether or not it's fixed in place on certain axes.
Dynamically zoom and move the camera so both players are always within view.


Interactables:

Created the base interactable object which all interactable items in the game were children of.

 - Had a highlighted outline whenever a player was nearby

 - Interaface method for GetIsInteractable for cases where the the player shouldn't be able to interact with an item (e.g. already carrying too many of that item, or it is a one-time interaction)

 - Activates the player's exclamation mark widget when nearby and interactable

 - Created a custom outline material and used custom depth rendering so the outline is always visible through other meshes.



Music minigame:

Created a rhythm game using UE's collision detection

Created a scalable system for mapping notes to different songs, with variable time signature, bpm and note travel speed.

Made 5 interactable instruments

Created the theatre environment from scratch.

Added a randomised audience with different animations and sounds depending on the performance.

Playtested and adjusted difficulty. Made the level get increasingly harder and varied the note patterns to keep it fun for the full game.


Widgets:

Created all menus in the game, including:

 - the main menu which used actual actors to navigate by implementing a bespoke input control mapping for this screen.

 - the end menu where it's either commiserations or congratulations.

 - the Pause menu where you can return to the main menu or resume.

Created almost all widgets in the game, including all score counters with live-renders of the objective meshes, added all of the logic to populate the instructions widget, the dialogue widget, the fade-to-black widget and most of the logic in the endgame widget.

Created a "Continue" interface for widgets so that when the player presses any button while the continue text is visible, it will move onto the next scene.

Colour coded all score widgets so the player knows what heart rating they are currently on.


Flower Minigame:
Flowers:

- Created cyan, magenta and yellow flowers by combining meshes and creating custom dynamic materials.

- Made patches of flowers that spawn a random number of flowers, randomly within a given radius. Made the patches reassign colours so that there are at least 3 patches of each type of colour in the level.

- Wrote an algorithm for combining colours so that the saturation is boosted and the colour mixing is more intuitive.

- Chose a random target colour at the start of each match from a pool of possible colours which can always be constructed using between 5 and 10 flowers, and is never too close to the base colours or easy to guess.

- Created the HUD for the minigame which lists the best colour so far with the combination of flowers used to contruct it.

- Created the flower mixing machine from scratch using different unrelated assets. Used a spline to make the generated flower travel down the conveyor belt and land in the resultant patch. Made the text on the machine have a dynamic material so that after activating it, it becomes un-interactable for a short time indicated by its red text.


Bees:

 - Created the Bee AI and bee meshes, which oscillate up and down. Bees always follow the dog and try to sting it.

 - Created the stinging effect which launches the bee towards the dog, launches the dog and also the carried flowers, which then disappear shortly after.

 - Created spawn/exit points for the bees so they can continually spawn in and leave after being hit with water or stinging the dog. This was written in a general enough way that it could be reused for the raccoons in the rubber game.

 - Bees increase in speed slowly over their lifetime, so the human player has to get rid of them before it becomes too difficult for the dog.

 - Created the entire environment from scratch, including the moving cars.



Fire Minigame:

Create the entire fire minigame

 - Fire actor which decreases in health every time it is hit by wind, which decreases its size, eventually putting it out.

 - Wind which was just a collection of oscillating cuboid meshes with a random velocity towards the fire.

 - Shield which is a stone slab that blocks the wind

 - Made custom character movement so they can only travel left and right, and are locked to only face away from the fire and at a certain radius.

 - HUD with a live, moving render of the fire in the widget that displays the colour-coded health based on rating.


Other Minigames:

Helped with the team's minigames by testing and debugging lots of code and blueprints.

e.g. helped debug an interactable switch with a null target variable, debugged the raccoon behaviour tree to find an erroneously cached AI controller, fixed collisions of letter blocks in the words minigame, etc.


Content creation:

Added the initial dialogue in the office level, as well as the post-music, words and gems minigame date scenes. This includes the ending proposal scene.

Created the maps for all of these scenes from scratch.

Created splines that spawn cars at a customisable spacing, speed and direction.

Created the car object that randomly selects a vehicle mesh from a customisable array of meshes, randomly beeps their horn, makes a random engine sound, and has square, rounded-square or round wheels dependent on the wheel minigame rating. This effects it vertical oscillation height and frequency to emulate a bumpy ride.


Audio:

Sourced and implemented most of the games audio, including all of the music and almost all SFX.


Videos:

Packaged the game.

Recorded all gameplay of the game used in the videos (controlling both characters myself!).

Edited together the long playthrough with commentary.