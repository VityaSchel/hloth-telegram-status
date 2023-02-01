# Telegram Emoji Status bot

<p align="center">
  <img width="123" alt="image" src="https://user-images.githubusercontent.com/59040542/216113854-3172f219-8f46-42d0-b8e7-d99c226ebfd4.png">
  <img width="122" alt="image" src="https://user-images.githubusercontent.com/59040542/216113487-0528192c-cd6b-4b58-b10c-73eaab13419f.png">
  <img width="121" alt="image" src="https://user-images.githubusercontent.com/59040542/216113693-4b6030e5-d0cb-453b-bba2-14438337867a.png">
</p>

Simple Node.js program that changes emoji status from "Work" to "Sleep" and back depending on time and day of week.

## About this project

Built with 3 statuses in mind:
- **Work**: from 15 until 22 every weekday relative to Russia, Samara timezone
- **Sleep**: from 0 until 15 and from 22 until 0 every weekday relative to the same timezone
- **AFK**: full weekend

Emojis are taken from default [«Bubbles Emoji»](https://t.me/addemoji/BubbleEmoji) emoji set. 

All these settings can be adjusted in [src/status.ts](./src/status.ts).

Works if you have Telegram Premium subscription.

## Technical details

Works on **[gram.js](https://gram.js.org/)**, stores session as local files (`.telegram_session` directory).

Tested with **[Jest](https://jestjs.io/ru/)**, covers only status determination function.

Initialized with my personal bootstrapping tool [Scaffold](https://github.com/VityaSchel/scaffold).

TypeScript, SWC, Babel used in this project are self-explanatory.

## Install & setup

1. Clone this repository
2. Install all dependencies (first install Node.js and npm if you don't have it)
3. Build with SWC using `npm run build`
4. Setup with `npm run start -- --interactive` (note both `--`), follow instructions in interactive prompt
5. Add cronjob to execute this script every few hours, see examples below

> **Warning**
> Make sure to replace path to Node.js with yours. Use this command to get Node.js executable path: `which node`. 
> Also replace path to this repository, this path is for demonstration purposes and you will likely have different directory.

You can use any frequency you like, but I prefer every hour:

```cron
0 * * * * /usr/bin/node /path/to/repo/out/index.js
```

Every two hours:

```cron
0 */2 * * * /usr/bin/node /path/to/repo/out/index.js
```

Every ½ hour:

```cron
*/30 * * * * /usr/bin/node /path/to/repo/out/index.js
```

[And so on...](https://crontab.guru/)

## LICENSE

[MIT](./LICENSE.md)

## Funding

Made in one hour, now [get me a job](https://hloth.dev).