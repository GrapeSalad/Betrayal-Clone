import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {CharacterInfoComponent} from './character-info/character-info.component';
import { EnterComponent } from './enter/enter.component';
import { LeftRoomComponent } from './left-room/left-room.component';
import { RightRoomComponent } from './right-room/right-room.component';
import { GardenComponent } from './garden/garden.component';
import { MusicRoomComponent } from './music-room/music-room.component';
import { LibraryComponent } from './library/library.component';
import { KitchenComponent } from './kitchen/kitchen.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'character-info',
    component: CharacterInfoComponent
  },
  {
    path: 'enter',
    component: EnterComponent
  },
  {
    path: 'enter/leftRoom',
    component: LeftRoomComponent
  },
  {
    path: 'enter/rightRoom',
    component: RightRoomComponent
  },
  {
    path: 'kitchen',
    component: KitchenComponent
  },
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'garden',
    component: GardenComponent
  },
  {
    path: 'music-room',
    component: MusicRoomComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
