import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartHubService {
  private readonly apiUrl = 'https://localhost:7043';

  private readonly signalRConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${this.apiUrl}/hub/part`)
    .build();

  private readonly processorUsage = new Subject<number>();
  private readonly availableMemory = new Subject<number>();

  constructor() {
    this.signalRConnection
      .start()
      .then(() => console.log('Part hub connection started'))
      .catch((err) => console.error('Error while starting connection: ' + err));

    this.signalRConnection.on(
      'ReceiveAvailableMemory',
      (availableMemory: number) => {
        this.availableMemory.next(availableMemory);
      }
    );

    this.signalRConnection.on(
      'ReceiveProcessorUsage',
      (processorUsage: number) => {
        this.processorUsage.next(processorUsage);
      }
    );
  }

  public getLiveProcessorUsage(): Observable<number> {
    return this.processorUsage.asObservable();
  }

  public getLiveAvailableMemory(): Observable<number> {
    return this.availableMemory.asObservable();
  }
}
