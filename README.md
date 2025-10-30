# EaglerCraftX Server

## Client Version
This repository includes the **latest Eaglercraft 1.12.2 WASM-GC client**. See [CLIENT_VERSION.md](CLIENT_VERSION.md) for details and verification information.

## Credits
Original Project: Lax1Dude
<br>
1.12 Project: PeytonPlayz595
<br>
Original Server Fork: EcoliEater87
<br> 
Adapted to Canary Craft (ADSCRAFT): QuizzityMC
<br>

## To make an eaglercraft 1.12 server, follow the instructions below:
Here is how you can setup a connection:
<br>
<br>
First, go to the top of the repo and click on code > codespaces > create codespace
<br>
now you have your own free server instance to host eaglercraft. Next you need to run the setup commands:
<br>
<br>
Create a terminal tab and paste the following:<br>
<br>
enter the following: `cd bungee && sudo java -jar bungee.jar`
<br>
then, make a new tab and enter the following: cd server && sudo java -jar server.jar
<br>
Now go to the ports area and forward (and make public) port `8081`
<br>
Load up the client! When you are in, copy the link, paste it in the add server section, replace https:// with wss:// and join!
Your eaglercraft server is setup!

PS: You can use this as a normal server too (like properly hosted) just clone this repo and run it in much the same way.
