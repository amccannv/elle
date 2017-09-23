import { Injectable, OnInit } from '@angular/core';

import * as io from 'socket.io-client';

import { Message } from './../models/message';
import { ChatService } from './chat.service';

import { SETTINGS } from './../settings';

@Injectable()
export class SocketioService implements OnInit {

  private socket: SocketIOClient.Socket;

  constructor(
    private chatService: ChatService,
  ) {
    this.socket = io.connect(SETTINGS.BACKEND_URL);
    this.consumeEventOnRoomConnected();

    this.consumeEventOnChatReceived();
  }

  ngOnInit() {
    console.log(this.socket);
  }

  // Emit room connect event
  emitConnectToRoomEvent() {
    console.log(this.socket);
    this.socket.emit(
      'adduser',
      this.chatService.userId,
      this.chatService.langUser.code,
      this.chatService.langStranger.code
    );
  }

  emitMessage(message: string) {
    this.socket.emit(
      'sendchat',
      message,
      this.chatService.langUser.code,
      this.chatService.langStranger.code
    );
  }

  consumeEventOnRoomConnected() {
    const self = this;
    this.socket.on('updaterooms', (result: any) => {
      console.log('UPDATEROOMS');
      console.log(result);
      this.chatService.roomConnectEvent.emit('test');
    });
  }

  consumeEventOnChatReceived() {
    const self = this;
    this.socket.on('updatechat', (userId: string, message: string, translated: string) => {
      console.log(userId);
      console.log(message);
      console.log('MESSAGE ' + translated);
      const isUser = userId === this.chatService.userId;
      this.chatService.messageReceivedEvent.emit(new Message({
        isUser: isUser,
        langUser: isUser ? message : translated,
        langStranger: isUser ? translated : message
      }));
    });
  }

  /*consumeEventDisconnectedReceived() {
    const self = this;
    this.socket.on('')
  }*/
}
