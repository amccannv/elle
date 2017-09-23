import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import { Message } from './../models/message';
import { ChatService } from './chat.service';

import { SETTINGS } from './../settings';

@Injectable()
export class SocketioService {

  socket: SocketIOClient.Socket;

  constructor(
    private chatService: ChatService,
  ) {
    this.socket = io.connect(SETTINGS.BACKEND_URL);
    this.consumeEventOnRoomConnected();
    this.consumeEventOnChatReceived();
    this.consumeEventDisconnectedReceived();
  }

  // Emit room connect event
  emitConnectToRoomEvent() {
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

  emitDisconnect() {
    this.socket.emit('disconnect');
  }

  consumeEventOnRoomConnected() {
    const self = this;
    this.socket.on('updaterooms', (result: any) => {
      this.chatService.roomConnectEvent.emit('test');
    });
  }

  consumeEventOnChatReceived() {
    const self = this;
    this.socket.on('updatechat', (userId: string, message: string, translated: string) => {
      const isUser = userId === this.chatService.userId;
      this.chatService.messageReceivedEvent.emit(new Message({
        isUser: isUser,
        langUser: isUser ? message : translated,
        langStranger: isUser ? translated : message
      }));
    });
  }

  consumeEventDisconnectedReceived() {
    const self = this;
    this.socket.on('disconnect', (result) => {
      console.log('DISCONNECTED');
      this.chatService.disconnectEvent.emit();
    });
  }
}
