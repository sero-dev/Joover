import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {
  catchError,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatHubService {
  private readonly apiUrl = 'https://localhost:7043';
  private readonly message = new Subject<Message>();
  private readonly status = new Subject<Status>();

  private readonly chatHubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.apiUrl}/hub/chat`)
    .build();

  constructor() {
    this.chatHubConnection.on(
      this.channels.receiveMessage,
      (message: Message) => {
        this.message.next(message);
      }
    );
  }

  public connect(room: string): Observable<void> {
    console.log(room);

    this.status.next('connecting');
    return from(this.chatHubConnection.stop()).pipe(
      switchMap(() => from(this.chatHubConnection.start())),
      tap(() => {
        this.status.next('connected');
        console.log('Chat Hub connection started');
      }),
      catchError((err) => {
        console.error('Error while starting connection: ' + err);
        this.status.next('disconnected');
        return of(void 0);
      })
    );
  }

  public getStatus() {
    return this.status.asObservable();
  }

  public getMessages(): Observable<Message> {
    return this.message.asObservable();
  }

  public sendMessage(text: string): Observable<void> {
    const message: Message = { text, username: 'Sean Rodriguez' };
    return from(this.chatHubConnection.send(this.channels.newMessage, message));
  }

  private channels = {
    receiveMessage: 'ReceiveMessage',
    newMessage: 'NewMessage',
  };
}

export interface Message {
  text: string;
  username: string;
}

export type Status = 'connected' | 'disconnected' | 'connecting';
