import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CharacterSelectComponent } from './character-select/character-select.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { AboutComponent } from './about/about.component';
import { RulesComponent } from './rules/rules.component';
import { CreditsComponent } from './credits/credits.component';

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
    path: 'game-board',
    component: GameBoardComponent
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
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
