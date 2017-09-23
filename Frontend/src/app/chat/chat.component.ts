import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

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
    private router: Router,
    private chatService: ChatService,
    private socketioService: SocketioService,
  ) { }

  langUser: Language;
  langStranger: Language;

  connecting = true;
  disconnected = false;

  messages: Message[] = [];

  message = 'Connecting...';

  private subscriptions = [];

  ngOnInit() {
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
      this.messages.push(message);
    });
    this.subscriptions.push(temp);

    temp = this.chatService.disconnectEvent.subscribe(() => {
      this.disconnected = true;
    });
    this.subscriptions.push(temp);

    this.socketioService.emitConnectToRoomEvent();
  }

  postMessage() {
    // send message to server
    this.socketioService.emitMessage(this.message);
    this.message = '';
  }

  disconnect() {
    this.disconnected = true;
    this.chatService.userId = null;
    this.message = 'DISCONNECTED';
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
}
