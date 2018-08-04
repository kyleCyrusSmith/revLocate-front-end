import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  ],
  entryComponents: [LeaderBoardComponent, LeaderBoardBottomSheetComponent,
    PopularSetsComponent, PopularSetBottomSheetComponent,
    GameLobbyComponent, GameLobbyBottomSheetComponent],
  providers: [{ provide: ErrorHandler, useClass: StatusCodeHandlerService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
