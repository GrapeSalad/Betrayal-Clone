# Betrayal at House on the Hill (for the web)

A fan-made web-based copy of the popular board game [Betrayal at House on the Hill](http://avalonhill.wizards.com/games/betrayal-at-house-on-the-hill) built by [Epicodus](https://www.epicodus.com/) students.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Specs/Wishlist

| Pivotal Game Objects | Requirements |
|---|---|
| House | Pathing through rooms |
| Omen "cards" | Database Objects referencing in-game omens |
| Event "cards" | see omen |
| Haunt Counter | on omen reveal, increment haunt counter until haunt occurs |
| Haunt | special event occurs to change gameplay |
| Character stats | adjust stats to account for omen and event card resolution |


## MVP

#### Front End

*Character Art* (One Character) <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Character Card  <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Token/Figure “in game”

*Card Art* (We don’t need all of the cards for the mvp) <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Omen ~ 10 <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Event ~ 15

*Haunt* (We should decide on one haunt that we all think is do-able and engaging) <br>

*Animations*

#### Back End


*Character Data* <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Scaling stats <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Name <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Picture <br>


*Room Tile* <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Random Generation <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Triggers <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Events <br>
*Draw Card* <br>
*Special Room* <br>
*Haunt* <br>

<hr>
## Project Build
Download from the [repo](https://github.com/GrapeSalad/Betrayal-clone)
Run `ng -v` to ensure than your Angular is version **4**.

| If Not Run One of these Commands |
| --- |
| For Windows |
|`npm install @angular/common@next @angular/compiler@next @angular/compiler-cli@next @angular/core@next @angular/forms@next @angular/http@next @angular/platform-browser@next @angular/platform-browser-dynamic@next @angular/platform-server@next @angular/router@next @angular/animations@next --save` |
| For Linux/Mac |
|`npm install @angular/{common,compiler,compiler-cli,core,forms,http,platform-browser,platform-browser-dynamic,platform-server,router,animations}@next --save` |

Run `npm install` to install all dependencies with Node Package Manager, then `bower install` to install the styling dependencies.

## API Key

You will need to create your own API key variable to access the [Google Firebase](https://firebase.google.com).
A file will need to be created at `src/app/api-keys.ts` and populated with this code: `export const masterFirebaseConfig = "apiKey";`
Upload `game-data.json` to the database and ensure that the read and write options are set to true.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Known Bugs

* If you move too fast through the house the die roll on the screen will reflect a different die roll occurring in the code.
* Damage done does not account for multiple stats affected due to poor rolls from one card.

## Technologies Utilized

* Angular
* Firebase
* Node.js
* Bower
* SASS

## Credits

* David Wilson
* Alyssa Moody
* James Lannon
* Karina Roush

**A live version of this game can be found on [Firebase](https://betrayal-a31a0.firebaseapp.com)**
