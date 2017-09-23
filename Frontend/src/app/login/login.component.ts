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
  }

  connect() {
    if (this.langUser == null || this.langStranger == null) {
      alert('NEED TO SELECT LANGUAGE');
      return;
    }
    this.chatService.generateUserId();
    this.chatService.langUser = this.langUser;
    this.chatService.langStranger = this.langStranger;

    // tslint:disable-next-line:max-line-length
    alert('CONNECT USERID: ' + this.chatService.generateUserId() + ' USERLANG: ' + this.langUser.code + ' STRANGERLANG: ' + this.langStranger.code);

    this.router.navigate(['/']);
  }
}
