import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { from, merge, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatHubService {
  private readonly apiUrl = 'https://localhost:7043';
  private readonly message = new Subject<Message>();

  private readonly chatHubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.apiUrl}/hub/chat`)
    .build();

  constructor() {
    this.chatHubConnection
      .start()
      .then(() => console.log('Chat Hub connection started'))
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.chatHubConnection.on(
      this.channels.receiveMessage,
      (message: Message) => {
        this.message.next(message);
      }
    );
  }

  public getMessages(): Observable<Message> {
    return merge(this.message.asObservable(), from(debugMessages()));
  }

  public sendMessage(text: string): Observable<void> {
    const message: Message = { text, username: 'Sean Rodrgiuez' };
    return from(this.chatHubConnection.send(this.channels.newMessage, message));
  }

  private channels = {
    receiveMessage: 'ReceiveMessage',
    newMessage: 'NewMessage',
  };
}

function debugMessages(): Message[] {
  return [
    {
      text: 'Ullam tempore nulla dolorem excepturi doloremque.',
      username: 'Alta Beahan',
    },
    {
      text: 'Quae a consectetur cumque odio optio inventore.',
      username: 'Jan Maggio',
    },
    {
      text: 'Non deleniti commodi itaque alias quaerat eaque exercitationem et facilis.',
      username: 'Shemar Rohan',
    },
    {
      text: 'Et est autem autem perspiciatis autem sed.',
      username: 'Amir King',
    },
    {
      text: 'Et blanditiis consequatur voluptates et.',
      username: 'Theresia Beatty',
    },
    {
      text: 'Ullam tempore nulla dolorem excepturi doloremque.',
      username: 'Alta Beahan',
    },
    {
      text: 'Quae a consectetur cumque odio optio inventore.',
      username: 'Jan Maggio',
    },
    {
      text: 'Non deleniti commodi itaque alias quaerat eaque exercitationem et facilis.',
      username: 'Shemar Rohan',
    },
    {
      text: 'Et est autem autem perspiciatis autem sed.',
      username: 'Amir King',
    },
    {
      text: 'Et blanditiis consequatur voluptates et.',
      username: 'Theresia Beatty',
    },
  ];
}

export interface Message {
  text: string;
  username: string;
}
