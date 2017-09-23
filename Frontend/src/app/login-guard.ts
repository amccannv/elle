import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Router } from '@angular/router';
import { ChatService } from './services/chat.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private chatService: ChatService,
  ) {}

  canActivate() {
    const loggedIn = this.chatService.userId != null;

    if (!loggedIn) {
      this.router.navigate(['/login']);
    }

    return loggedIn;
  }
}
