# Home assistent
## STRUCTURE
### Entities
these are the lowest level possible. They represent single sensors like a temperature sensor, a lightswitch…
### Devices
These are a group of entities. It could be that a device has 1 entity (ex. a lightswitch), but it also could have multiple entities (ex. a motion sensor that is also capable of capturing the temperature).
### Areas
These are groups of devices that could correspond to rooms in your house. Your living room could have devices like a light-switch, a motion sensor (that detects if someone is in the room), a set of speakers… All of these devices could be grouped together in one area.
### Automations
Automations are a used to automate things. These automations consist of three things.
	Triggers:
    	These are used for the activation of the automation (ex. a motion-sensor detects motion)
    Conditions:
    	These are extra conditions that need to be met before excecuting the automation (ex. someone needs to be home)
    Actions:
    	These are things that happen after a trigger and the conditions are met (ex. turn on the light in the room)
### Scripts
Scripts are automations without a trigger. This means they can't be run without being activated by an automation or another trigger. This is mostly used to do the same tactions from different automations. If you set the lights in a single room up in scripts (turn all the lights in the room on). You could create a script that runs all the scripts to turn on the lights when the user enters the house. This way all the lights (that are defined in different rooms), could be activated all at once.
### Scenes
Scenes are used to set an enviroment to a specific state. If the user would want to watch a movie, a scene could be set up. It would turn on the tv, dim the lights, turn off the speakers…
## How to translate the different structures to IDP