import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { Language } from './../models/language';

@Injectable()
export class LanguageService {

  constructor() { }

  langUser: Language = null;
  langStranger: Language = null;

  private languages: Language[] = [
    new Language({id: 1, code: 'EN', display: 'English'}),
    new Language({id: 1, code: 'FR', display: 'French'})
  ];

  getLanguages() {
    return this.languages;
  }

  setUserLanguage(code: string): boolean {
    const language = _.find(this.languages, {code: code});
    if (language == null) {
      return false;
    }

    this.langUser = language;
    return true;
  }

  setStrangerLanguage(code: string): boolean {
    const language = _.find(this.languages, {code: code});
    if (language == null) {
      return false;
    }

    this.langStranger = language;
    return true;
  }
}
