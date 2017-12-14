import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './api/component/profile/profile.component';
import { ChatComponent } from './api/component/chat/chat.component';
import { LoginComponent } from './api/component/login/login.component';
import { Routing } from './router';
import { RegisterComponent } from './api/component/register/register.component';
import { LandingComponent } from './api/component/landing/landing.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    ProfileComponent,
    RegisterComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Routing,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
