import { Component, OnInit } from '@angular/core';

import { ChatService } from './../services/chat.service';

import { Message } from './../models/message';
import { Language } from './../models/language';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private chatService: ChatService,
  ) { }

  langUser: Language;
  langStranger: Language;

  disconnected = false;

  messages: Message[] = [
    new Message({isUser: true, langUser: 'something in english', langStranger: 'something in french'}),
    new Message({isUser: false, langUser: 'something in english 2', langStranger: 'something in french 2'}),
    new Message({isUser: true, langUser: 'something in english', langStranger: 'something in french'}),
    new Message({isUser: false, langUser: 'something in english 2', langStranger: 'something in french 2'}),
    new Message({isUser: true, langUser: 'something in english', langStranger: 'something in french'}),
    new Message({isUser: false, langUser: 'something in english 2', langStranger: 'something in french 2'}),
    new Message({isUser: true, langUser: 'something in english', langStranger: 'something in french'}),
    new Message({isUser: false, langUser: 'something in english 2', langStranger: 'something in french 2'}),
    new Message({isUser: true, langUser: 'something in english', langStranger: 'something in french'}),
    new Message({isUser: false, langUser: 'something in english 2', langStranger: 'something in french 2'}),
  ];

  ngOnInit() {
    this.langUser = this.chatService.langUser;
    this.langStranger = this.chatService.langStranger;
  }

  postMessage(text) {
    this.messages.push({isUser: true, langUser: text, langStranger: 'something translated'});
    // TODO: post, get translated, etc.
  }

  disconnect() {
    this.disconnected = true;
  }

  exit() {
    // TODO
  }
}
