import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { WelcomeComponent } from './welcome/welcome.component';
import {routing} from './app.routing';
import { AppComponent } from './app.component';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { EnterComponent } from './enter/enter.component';
import { LeftRoomComponent } from './left-room/left-room.component';
import { RightRoomComponent } from './right-room/right-room.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { GardenComponent } from './garden/garden.component';
import { MusicRoomComponent } from './music-room/music-room.component';
import { LibraryComponent } from './library/library.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CharacterSelectComponent } from './character-select/character-select.component';
import { GameBoardComponent } from './game-board/game-board.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CharacterInfoComponent,
    EnterComponent,
    LeftRoomComponent,
    RightRoomComponent,
    KitchenComponent,
    GardenComponent,
    MusicRoomComponent,
    LibraryComponent,
    LandingPageComponent,
    CharacterSelectComponent,
    GameBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
