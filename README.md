# Discord Server Channel Attachment Downloader BOT

## General info:
This is Discord Bot which downloads all attachment from the specified server channel.
**You must have administrator permission on the server to use the bot**
Built using **NodeJS**, **Axios** and **Discord.js**
**Only tested with Windows 10**

## Setup:
First you need to have [NodeJS](https://nodejs.org/en/download/) installed on your computer/machine
To install NodeJS visit: [NodeJS](https://nodejs.org/en/download/)
When you are done with the installation, you need to create a Discord bot.

Open: [Discord Applications](https://discordapp.com/developers/applications)
Click on the "New Application" button in the top right corner.
Enter the app name (type anything that you want), and click on the "Create" button.
Then, navigate to the "Bot" card (left side).
Press "Add Bot" button, and select "Yes".
Then, click on the "Click to reveal" and copy the token.
Save the token in the text file, you will need it later.
Then, navigate back to the "General Information" card (left side), and copy the "Client Id".

Open: [Permission Calculator](https://finitereality.github.io/permissions-calculator/?v=0)
Select the "Administrator" checkbox.
Paste the "Client id" in the "Client Id" field.
Click "Add" button, then select the server in which you want to use the bot and click "Authorize".

Now, you will need to download the Bot itself.
Scroll up in this repository, click on the "Clone or download" button and select "Download ZIP".
Then, extract the ZIP where you want.
Open the directory which contains the bot.
Open config.js with prefered editor.
Copy the bot token which you have saved earlyer, then paste it in the config.js at token: '' (line 3), **paste it between the single quotes**.
Example:
```
token: 'NTcxNjkwMjYxMDQyODIzMTg4.XMRaOg.R67NsilbXzswJheO2GpfUKs-e7o',
```
Save and close the file.
Now, you need to open the command prompt/terminal and navigate to this folder.
On Windows you can SHIFT + Right Click on the white space in the folder and select the option (Open PowerShell or Command Promt, something like that).
Then type the following:
```
npm install
```

## Usage:
Open discord, go to the setting, navigate to "Apperance tab", enable "Developer Mode".
Open the serve, navigate to the channel from which you want to download the attachments.
Right click on the channel name, click on the "Copy ID" option.
Open the folder where the Bot is located, open the config.js
Find the channelId, and paste the channel id between the single quotes
Example:
```
channelId: '519924918775709699',
```
Then you can change the folder and file name donwn bellow, if you want.
**PS: The folder will be created in the same folder where the BOT code is, you can not use the external folders without chaning the code**
Save the file.

Now, you need to open the command prompt/terminal and navigate to this folder.
On Windows you can SHIFT + Right Click on the white space in the folder and select the option (Open PowerShell or Command Promt, something like that).
Then type the following:
```
npm run fetch
```
Now, the bot will download all links of the attachments into textual file.
Wait until the program displays: "DONE!"

Now, type the following into the terminal:
```
nom run download
```

That is it, the program will now download all files to the directory/folder which you have specified in the configs.
If you have any questions, be free to contact me via mail: [milutinke@gmx.com](mailto:milutinke@gmx.com) :)

## For other developers:
You are free to change the code, if you want you can improve it, I am too lazy to do it.
I decided to make this because I could not find anything similar, and I needed this.
My suggestion is incorporating it into the Electron and making the GUI, to ease the usage.
If you decide to distribute and modify the code, I ask you to note that I am the original author, thanks :)