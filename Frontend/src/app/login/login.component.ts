import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LanguageService } from './../services/language.service';
import { ChatService } from './../services/chat.service';

import { Language } from './../models/language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private chatService: ChatService,
  ) { }

  languages: Language[];

  langUser: Language;
  langStranger: Language;

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.langUser = this.chatService.langUser;
    this.langStranger = this.chatService.langStranger;
  }

  connect() {
    if (this.langUser == null || this.langStranger == null) {
      return;
    }

    this.chatService.generateUserId();
    this.chatService.langUser = this.langUser;
    this.chatService.langStranger = this.langStranger;

    this.router.navigate(['/']);
  }
}
