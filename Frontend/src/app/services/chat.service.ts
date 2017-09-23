import { Injectable } from '@angular/core';

import { Language } from './../models/language';

@Injectable()
export class ChatService {
  userId: string = null;

  constructor() {}

  langUser: Language = null;
  langStranger: Language = null;

  generateUserId(): string {
    this.userId = this.guid();
    return this.userId;
  }

  private guid() {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
