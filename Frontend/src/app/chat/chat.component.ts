import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChatService } from './../services/chat.service';
import { SocketioService } from './../services/socketio.service';

import { Message } from './../models/message';
import { Language } from './../models/language';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(
    private chatService: ChatService,
    private socketioService: SocketioService,
  ) { }

  langUser: Language;
  langStranger: Language;

  connecting = true;
  disconnected = false;

  messages: Message[] = [];

  message = '';

  ngOnInit() {
    this.langUser = this.chatService.langUser;
    this.langStranger = this.chatService.langStranger;

    // set up events
    this.chatService.roomConnectEvent.subscribe((roomId: string) => {
      // connected
      this.connecting = false;
    });

    this.chatService.messageReceivedEvent.subscribe((message: Message) => {
      // translated message received
      this.messages.push(message);
    });

    this.socketioService.emitConnectToRoomEvent();
  }

  postMessage() {
    // send message to server
    this.socketioService.emitMessage(this.message);
    this.message = '';
  }

  disconnect() {
    this.disconnected = true;
  }

  exit() {
  }

  ngOnDestroy() {

  }
}
