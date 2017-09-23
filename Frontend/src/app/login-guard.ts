import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Router } from '@angular/router';
import { LanguageService } from './services/language.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private languageService: LanguageService,
  ) {}

  canActivate() {
    const loggedIn = this.languageService.langStranger != null && this.languageService.langUser != null;

    if (!loggedIn) {
      this.router.navigate(['/login']);
    }

    return loggedIn;
  }
}
