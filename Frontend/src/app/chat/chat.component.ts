import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { ChatService } from './../services/chat.service';
import { LanguageService } from './../services/language.service';
import { SocketioService } from './../services/socketio.service';

import { Message } from './../models/message';
import { Language } from './../models/language';

import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger(
      'slideUp',
      [transition(
        ':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateY(0)', 'opacity': 1}))
        ]
      )]
    )
  ]
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private chatService: ChatService,
    private languageService: LanguageService,
    private socketioService: SocketioService,
  ) { }

  langUser: Language;
  langStranger: Language;

  connecting = true;
  disconnected = false;

  messages: Message[] = [];

  message = 'Connecting...';

  private subscriptions = [];

  private tempTooltip: any;

  ngOnInit() {

    // initialize socket
    this.socketioService.init();

    this.langUser = this.chatService.langUser;
    this.langStranger = this.chatService.langStranger;

    // set up events
    let temp = this.chatService.roomConnectEvent.subscribe((roomId: string) => {
      // connected to person
      this.connecting = false;
      this.message = '';
    });
    this.subscriptions.push(temp);

    temp = this.chatService.messageReceivedEvent.subscribe((message: Message) => {
      // translated message received
      this.messages.unshift(message);
    });
    this.subscriptions.push(temp);

    temp = this.chatService.disconnectEvent.subscribe(() => {
      this.disconnect(false);
    });
    this.subscriptions.push(temp);

    temp = this.languageService.translatedStringEvent
      .subscribe((result) => {
        if (window.getSelection && window.getSelection().toString() === result.origMsg) {
          this.tempTooltip.message = result.msg;
          this.tempTooltip.show();
        }
      });
    this.subscriptions.push(temp);

    this.socketioService.emitConnectToRoomEvent();
  }

  postMessage() {
    if (this.isEmptyOrWhitespace(this.message)) {
      return;
    }

    // send message to server
    this.socketioService.emitMessage(this.message);
    this.message = '';
  }

  disconnect(emitDisconnect: boolean = true) {
    this.disconnected = true;
    this.chatService.userId = null;
    this.message = 'DISCONNECTED';
    if (emitDisconnect) {
      this.socketioService.socket.disconnect();
    }
  }

  quit() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // unsubscribe from all events
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });

    // disconnect from socket
    if (this.socketioService.socket != null) {
      this.socketioService.socket.disconnect();
    }
  }

  private isEmptyOrWhitespace(str) {
    return str === null || str.match(/^\s*$/) !== null;
  }

  private checkSelectedText(tooltip: any) {
    let text = '';

    if (this.tempTooltip != null) {
      this.tempTooltip.message = '';
      this.tempTooltip = null;
    }

    if (window.getSelection) {
      this.tempTooltip = tooltip;
      text = window.getSelection().toString();
    }
    if (!this.isEmptyOrWhitespace(text)) {
      // get translation of text
      this.languageService.translate(this.langStranger.code, this.langUser.code, text);
    }
  }
}
