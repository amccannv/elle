import { Component, OnInit } from '@angular/core';

import { LanguageService } from './../services/language.service';

import { Language } from './../models/language';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private languageService: LanguageService
  ) {}

  languages: Language[];

  ngOnInit() {
    this.languages = this.languageService.getLanguages();
  }

}
