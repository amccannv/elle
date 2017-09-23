import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { Language } from './../models/language';

@Injectable()
export class LanguageService {

  constructor() { }

  private languages: Language[] = [
    new Language({id: 1, code: 'en', display: 'English'}),
    new Language({id: 2, code: 'zh', display: 'Chinese'}),
    new Language({id: 2, code: 'fr', display: 'French'}),
    new Language({id: 2, code: 'jp', display: 'Japanese'}),
  ];

  getLanguages() {
    return this.languages;
  }
}
