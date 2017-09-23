import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';

import { LoginGuard } from './login-guard';

// Services
import { LanguageService } from './services/language.service';
import { ChatService } from './services/chat.service';
import { SocketioService } from './services/socketio.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    // Services
    LanguageService,
    ChatService,
    SocketioService,
    // Guards
    LoginGuard,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
