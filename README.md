# Betrayal at House on the Hill (for the web)

A fan-made web-based copy of the popular board game [Betrayal at House on the Hill](http://avalonhill.wizards.com/games/betrayal-at-house-on-the-hill) built by [Epicodus](https://www.epicodus.com/) students.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Specs/Wishlist

| Pivotal Game Objects | Requirements |
|---|---|
| House | Static Foyer, random rooms |
| Item "cards" | Database Objects referencing in-game items (probably in an array?) |
| Omen "cards" | same as items, but different object/array |
| Event "cards" | see omen |
| Characters | this may be part of the stretch goals, due to complexity in routing <br> for different characters |
| Turn Counter | this is an *if* dependent on the character functionality |

## MVP

#### Front End

*Character Art* (One Character) <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Character Card  <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Token/Figure “in game”


*Card Art* (We don’t need all of the cards for the mvp) <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Item ~ 8 <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Omen ~ 10 <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Event ~ 15


*Room Tiles* <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Upstairs ~ 5 <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Ground ~ 10 <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Downstairs ~ 5


*Haunt* (We should decide on one haunt that we all think is do-able and engaging)

#### Back End


*Character Data* <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Scaling stats <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Items <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Omens


*Room Tile* <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Random Generation <br>
&nbsp;&nbsp;&nbsp;&nbsp; + Triggers <br>
*Draw Card* <br>
*Special Room* (Maybe not part of MVP) <br>
*Haunt?* <br>
*How to traverse the rooms?!?!?*

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
