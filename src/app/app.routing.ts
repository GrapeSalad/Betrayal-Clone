import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {CharacterInfoComponent} from './character-info/character-info.component';
import { EnterComponent } from './enter/enter.component';
import { LeftRoomComponent } from './left-room/left-room.component';
import { RightRoomComponent } from './right-room/right-room.component';

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
    path: 'character-info/enter',
    component: EnterComponent
  },
  {
    path: 'character-info/enter/leftRoom',
    component: LeftRoomComponent
  },
  {
    path: 'character-info/enter/rightRoom',
    component: RightRoomComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
