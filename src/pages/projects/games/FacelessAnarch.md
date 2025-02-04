---
title: The Faceless Anarch
description: Top-down fantasy roguelike.
layout: project.njk
date: 2024-05-17
tags:
- Unreal Engine
- C++
thumbnail: /images/FacelessAnarchScreenshot.png
---

## Technologies Used

- Unreal Engine 5
- C++


## My Contributions
Movement:

    Implemented a WASD top-down movement system
    Made the character rotate towards the cursor using interpolation. Made the character snap rotation towards the cursor when performing an ability rather than use interpolation so that combat inputs would be more accurate when performed quickly.

Animation:

    Made a blendspace for movement animation so it looks natural in any direction and speed
    Created a Synty retargeter and retargeted all animations used from the UE4 manequin to the used asset pack's unique skeleton.
    Created anim montages for the combat animations with anim notifies for start/end of attack and reenabling input, allowing for attack animation cancellation.


Combat System:

    Wrote the entire combat system with 4 abilities, each of which is upgradable either by which element is equipped to it or its level. Implemented 2 elements: fire and physical, each of which has different effects on the abilities. Made the max ability level 10.
    Added input buffering to queue up the next command, making combat feel smoother.
    4-move attack combo with animation cancelling and a retriggerable delay for restarting the combo.
    Created the "Combat Character" blueprint class which is extended by both the player and all enemies. Implemented in such a way that you can only deal damage to the opposing team, but everyone has access to the same pool of moves, abilities system and health.
    Made attacks do a capsule shaped object traces for enemies using sockets on the weapon. Optimised the traces by only looking for pawns, and keeping track of hit actors for each attack, ingoring them on further traces.
    Made a fire attack that emits a wave of flames forward, dealing small damage to enemies on impact. Attack damage scales with ability level
    Made all fire abilities spawn a burning effect on enemies when hit.
    Created the base projectile, as well as the fire and physical projectiles used for ranged attacks. These would also only damage opposing characters, dependent on whether it was the player or enemy who spawned it in.
    Made the fireball projectile do splash damage to nearby enemies on impact, increasing in size and damage when upgraded.
    Added a dash ability which decreases in cooldown when upgraded (from 3 seconds to 1 by level 10)
    Added a physical ultimate ability which increases defence (reduces all incoming damage) but halves movement speed. Decreases damage further when upgraded.
    Added a fire ultimate ability that burns all nearby enemies every second using a sphere trace. Increases area of effect and damage on upgrade.

Effects (custom-made weapon trails):

    Created my own weapon trails as Niagara Systems using the ribbon effect.
    Created my own Niagara Module Script to fetch the speed of the weapon, and used it as a dynamic parameter in the materials I created for the trail. This meant that I could spawn the weapon trail when the sword was moving quickly, giving the desired effect of slashing through the air or leaving a trail of burning embers.

Audio:

    Added different background music to the menu and each of the levels to match the mood
    Added sword swing and hit sound effects, ranged attack sound effects that were different depending on element (e.g. fireball explode sound on hit), dash and ultimate sound effects, chest and door opening sounds.

Room progression:

    Created the interactable door which teleports you into the next level. Reward icons only show when the following room has a reward (i.e. no icon when leading to a safe room)
    Wrote the logic for room progression in the game instance: the next room being randomly chosen out of a pool of rooms, and being removed from that pool as to not repeat any rooms.
    Wrote the logic for level transitions: keeping all of the persistent player data, re-equipping the correct weapon, maintaining camera zoom, and setting the correct reward for the following room based on door choice.

Rewards:

    Created a chest that opens once all enemies have been defeated and spawns the reward.
    Created interactable rewards where you can either equip the reward (e.g. set element on ability and upgrade by 2 points) or convert it into 4 talent points that can be assigned to any ability to upgrade it.
    Randomised which ability the reward would effect if elemental (i.e. when picking the fire door, the reward will be a fire upgrade for one of the 4 abilities, chosen at random)

Enemy spawning:

    Added a wave spawning system which listens to enemy death delegates and spawns in the next wave of enemies at predetermined locations when the count reaches 0. Spawner is destroyed once the final enemy in its array has been spawned.
    Added logic to the game mode to detect when all enemies have been defeated and activate the reward chest / doors.
    Fixed Bee's continual enemy spawner so that you can have any number of possible enemies in the pool when randomly selecting which one to spawn, and making it so that the enemies stop spawning at a max number. Exposed the enemy spawn timings, max number of enemies and possible enemies as variables to edit outside the blueprint graph.

Environment:

    Created a Respawn Zone blueprint which respawns the player back onto a safe spot when falling somewhere off the map, also damaging the player by 5 hp. Enemies falling off the map would be immediately killed by the respawn zone.
    Adapted two demo maps from the asset packs to create the easy and boss rooms. Altered them to have the correct rotation, adapted the areas so the camera could always see the player, and added the relevant blueprints for gameplay (e.g. doors, chest, enemy spawners, end portal, respawn zones, etc.)


UI and Menus:

    Created almost all of the HUD and menus (all but the red "+" button and hover-over on the abilities and the talent points count).
    Created a game over and victory screen. Both allow you to play again from the start, resetting all of the relevant variables (e.g. completed rooms, game timer). Made the victory screen display the time taken to win, encouraging replaying and speedrunning the game.
    Added a main menu with a static background and the game title, with 3 buttons. Implemented the start and quit buttons, but didn't get round to the options menu.
    Created a health bar (with the exact numbers displayed as well).
    Created an abilities HUD which showed which button to press to activate each ability, the level of the ability (displaying "MAX" at 10) and the cooldown as a translucent progress bar overlayed on top of the ability square. Made the colour of the abilities HUD change depending on which element was equipped to it.
    Made Pei's work on the talent point / ability upgrade system integrate with the player talent points and ability system (decrementing and incrementing accordingly). Made the + buttons show or hide depending on remaining assignable talent points, or if it is already at max level.
    Made all HUD elements only refresh when necessary for optimisation, rather than using bindings.

Developer functions:

    Added debug functions to allow us to heal, add talent points, ugprade all abilities, change element for all abilities, progress to the next level, etc.


Overall, I managed to implement all the features planned in the correct order, moving on to help other members of the team in order to achieve the MVP as early as possible.