# Home automation
## What is home automation
Home automation is a very brought term that is used when talking about automating a home. It can be very simple like automaticially turning on a light when entering a room, to very complex problems like tuning the temperature of the house depending on various variables. It also refers to the security of a home: when should the security camera automaticially record, when should the doors automaticially lock, what should happen if the alarm goes of… Automaticially doing things, like automaticially making coffee at the start of the day, is also considered home automation. It can also be used to control the energy usage throughout the day to reduce costs.

Home automation consists of 3 main parts:
Smart home devices
Some kind of smart hub/server
An application

### Smart home devices
A smart home device (or smart devices) can be either of two things: a sensor or an actuator. A sensor can detect an event while an actuator can do something based on a trigger. A simple example can be a motion detector (sensor) that automaticially turns on a light (actuator) when there is movement. Depending on the device that is used, their may be some more advanced (smart) features in them. For example, the light could come with a sensor that mesures the brightness of a room, which automaticially adjusts the brightness of the light based on how much natural light is comming in. This is rarely used, because most of the time the user would like to configure this themself. The smart devices are, in other words, the actual hardware behind a smart home which, in most of the cases, do not have any smart home logic in them.
### Smart hub/server
The smart hub is a central device that forms a connection between the complex hardware of the devices and the user. It's function is to recieve data from the sensors and sent commands to actuators, a central hub for the devices so to speak. This hub can be provided by a manufacturer of smart devices specifficially for their devices, or it can be a generic one that tries to be as complient with as many devices as possible.
### Application
The application is a way for the user to configure their home. Most of the time this is done by creating a GUI (graphical user interface) in which the user can create automations, see the status of devices, see what automations are running, easily communicate with the devices… 
## Home assistent
Home assistent is an open source, all in one application for home automation. It runs a local server where smart devices can be connected to and configured, because it is local, it ensures great security of the users data. It has a large (and growing) comunity and therefore lots of compatiblity for different devices and brands. So it doesn't take 20 apps anymore to control a home enviroment. 
Home assistent also provides multiple UIs (dashboards) where users can see the state of their home. The user can pick a dashboard that was made by an other user, design one themself or build/expand on an existing dashboard. They can interact with the devices in their dashboard. The user can also create automations using a UI (not the same as the dashboard), these are actions that are excecuted if a trigger for set automation happens. To fully understand how these automations work, a further understanding of how home assistent works is required.
### Entities
these are the lowest level possible. They represent single sensors/actuators like a temperature sensor, a lightswitch, a light…
### Devices
These are a group of entities. It could be that a device has 1 entity (ex. a lightswitch), but it also could have multiple entities (ex. a motion sensor that is also capable of capturing the temperature).
### Areas
These are groups of devices that could correspond to rooms in a house. The living room could have devices like a light-switch, a motion sensor (that detects if someone is in the room), a set of speakers… All of these devices could be grouped together in one area.
### Scenes
Scenes are used to set an enviroment to a specific state. This enviroment doesn't need to be an area, it could manage smaler or bigger. If the user would want to watch a movie, a scene could be set up. It would turn on the tv, dim the lights, turn off the music that was playing througout the house…
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

kleine samenvatting met vb

### The UI for automations
leg uit hoe automations gedaan worden in HA.

## Available options