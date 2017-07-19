import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {GameBoardComponent} from './game-board/game-board.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'game',
    component: GameBoardComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
