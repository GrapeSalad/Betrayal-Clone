import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CharacterSelectComponent } from './character-select/character-select.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { AboutComponent } from './about/about.component';
import { RulesComponent } from './rules/rules.component';
import { CreditsComponent } from './credits/credits.component';
import { FriendSelectComponent } from './friend-select/friend-select.component';

const appRoutes: Routes = [
  {
   path: '',
   component: LandingPageComponent
  },
  {
    path: 'character-select',
    component: CharacterSelectComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  },
  {
    path: 'game',
    component: GameBoardComponent
  },
  {
    path: 'friend-select',
    component: FriendSelectComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
