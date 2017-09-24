import { Injectable, EventEmitter } from '@angular/core';

import { Http } from '@angular/http';

import * as _ from 'lodash';

import { Language } from './../models/language';

import { SETTINGS } from './../settings';

declare var bingClientTTS: any;
declare var BingSpeech: any;

@Injectable()
export class LanguageService {

  constructor(
    private http: Http,
  ) { }

  translatedStringEvent: EventEmitter<{fromLang: string, toLang: string, origMsg: string, msg: string}> = new EventEmitter();


  private languages: Language[] = [
    new Language({display: 'English', code: 'en', codeSpeech: BingSpeech.SupportedLocales.enCA_Female}),
    new Language({display: 'Afrikaans', code: 'af'}),
    new Language({display: 'Arabic', code: 'ar', codeSpeech: BingSpeech.SupportedLocales.arEG_Female}),
    new Language({display: 'Bosnian', code: 'bs'}),
    new Language({display: 'Bulgarian', code: 'bg'}),
    new Language({display: 'Cantonese (Traditional) Catalan', code: 'ca'}),
    new Language({display: 'Chinese Simplified', code: 'zh', codeSpeech: BingSpeech.SupportedLocales.zhCN_Female}),
    new Language({display: 'Croatian', code: 'hr'}),
    new Language({display: 'Czech', code: 'cs'}),
    new Language({display: 'Danish', code: 'da'}),
    new Language({display: 'Dutch', code: 'nl'}),
    new Language({display: 'Estonian', code: 'et'}),
    new Language({display: 'Fijian', code: 'fj'}),
    new Language({display: 'Filipino', code: 'fil'}),
    new Language({display: 'Finnish', code: 'fi'}),
    new Language({display: 'French', code: 'fr', codeSpeech: BingSpeech.SupportedLocales.frCA_Female}),
    new Language({display: 'German', code: 'de', codeSpeech: BingSpeech.SupportedLocales.deDE_Male}),
    new Language({display: 'Greek', code: 'el'}),
    new Language({display: 'Hindi', code: 'hi'}),
    new Language({display: 'Hungarian', code: 'hu'}),
    new Language({display: 'Indonesian', code: 'id'}),
    new Language({display: 'Italian', code: 'it', codeSpeech: BingSpeech.SupportedLocales.itIT_Male}),
    new Language({display: 'Japanese', code: 'ja'}),
    new Language({display: 'Korean', code: 'ko'}),
    new Language({display: 'Latvian', code: 'lv'}),
    new Language({display: 'Norweigian', code: 'no'}),
    new Language({display: 'Persian', code: 'fa'}),
    new Language({display: 'Polish', code: 'pl'}),
    new Language({display: 'Portuguese', code: 'pt'}),
    new Language({display: 'Romanian', code: 'ro'}),
    new Language({display: 'Russian', code: 'ru', codeSpeech: BingSpeech.SupportedLocales.ruRU_Male}),
    new Language({display: 'Slovak', code: 'sk'}),
    new Language({display: 'Splanish', code: 'es'}),
    new Language({display: 'Swedish', code: 'sv'}),
    new Language({display: 'Thai', code: 'th'}),
    new Language({display: 'Turkish', code: 'tr'}),
    new Language({display: 'Ukranian', code: 'uk'}),
    new Language({display: 'Urdu', code: 'ur'}),
    new Language({display: 'Vietnamese', code: 'vi'}),
    new Language({display: 'Welsh', code: 'cy'}),
  ];

  getLanguages() {
    return this.languages;
  }

  translate (fromLang: string, toLang: string, msg: string) {
    this.http.get(`${SETTINGS.BACKEND_URL}translate?fromLang=${fromLang}&toLang=${toLang}&msg=${encodeURI(msg)}`)
      .subscribe((response) => {
        if (response.ok) {
          this.translatedStringEvent.emit({fromLang: fromLang, toLang: toLang, origMsg: msg, msg: response.text()});
        }
      });
  }

  tts (language: Language, msg: string) {
    try {
      (bingClientTTS).synthesize(msg, language.codeSpeech);
    } catch (e) {
      console.log('couldnt play');
    }
  }
}
