import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule,
  MatBottomSheet,
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaderBoardComponent, LeaderBoardBottomSheetComponent } from './leader-board/leader-board.component';
import { PopularSetsComponent, PopularSetBottomSheetComponent } from './popular-sets/popular-sets.component';
import { MessageBarComponent } from './message-bar/message-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { StatusCodeHandlerService } from './status-code-handler.service';
import { ProfileComponent } from './profile/profile.component';
import { PlayGameComponent } from './play-game/play-game.component';
import { GameLobbyComponent, GameLobbyBottomSheetComponent } from './game-lobby/game-lobby.component';
import { CreateSetComponent } from './create-set/create-set.component';
import { CreateLocationComponent } from './create-location/create-location.component';
import { FriendsComponent, FriendsBottomSheetComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    NavbarComponent,
    LeaderBoardComponent,
    LeaderBoardBottomSheetComponent,
    PopularSetsComponent,
    PopularSetBottomSheetComponent,
    MessageBarComponent,
    ProfileComponent,
    PlayGameComponent,
    GameLobbyComponent,
    GameLobbyBottomSheetComponent,
    CreateSetComponent,
    CreateLocationComponent,
    FriendsComponent,
    FriendsBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    AppRoutingModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatBottomSheetModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule
  ],
  entryComponents: [LeaderBoardComponent, LeaderBoardBottomSheetComponent,
    PopularSetsComponent, PopularSetBottomSheetComponent,
    GameLobbyComponent, GameLobbyBottomSheetComponent,
    FriendsComponent, FriendsBottomSheetComponent],
  //  providers: [{ provide: ErrorHandler, useClass: StatusCodeHandlerService }],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
