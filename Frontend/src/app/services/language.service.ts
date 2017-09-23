import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { Language } from './../models/language';

@Injectable()
export class LanguageService {

  constructor() { }

  private languages: Language[] = [
    new Language({id: 1, code: 'EN', display: 'English'}),
    new Language({id: 1, code: 'FR', display: 'French'})
  ];

  getLanguages() {
    return this.languages;
  }
}
