import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { CreateSetComponent } from './create-set/create-set.component';
import { PlayComponent } from './play/play.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'play',
    component: PlayComponent
  },
  {
    path: 'lobby',
    component: GameLobbyComponent
  },
  {
    path: 'create',
    component: CreateSetComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
