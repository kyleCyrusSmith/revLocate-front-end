import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { CreateSetComponent } from './create-set/create-set.component';
import { PlayComponent } from './play/play.component';
import { FriendsComponent } from './friends/friends.component';
import { PlaySetComponent } from './play-set/play-set.component';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'register',
    component: RegisterComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'home',
    component: HomeComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'play',
    component: PlayComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'lobby',
    component: GameLobbyComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'create',
    component: CreateSetComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'friends',
    component: FriendsComponent,
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'play-set',
    component: PlaySetComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' })
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
