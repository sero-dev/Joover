import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChatComponent } from '../../chat.component';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  template: `
    <mat-card class="h-full flex flex-col" appearance="outlined">
      <mat-card-header class="flex justify-between items-center mb-2">
        <mat-card-title class="mat-title-medium">Chat Rooms</mat-card-title>
        <button mat-button (click)="onAddClicked()">Add</button>
      </mat-card-header>
      <mat-divider></mat-divider>
      <mat-card-content style="flex: 1 1 auto; min-height: 0">
        <mat-action-list class="h-full overflow-y-auto">
          @for (room of rooms(); track room) {
          <button mat-list-item (click)="onRoomSelected(room)">
            {{ room }}
          </button>
          }
        </mat-action-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
  :host { height: 100% }
`,
})
export class ChatListComponent {
  private chat = inject(ChatComponent);

  protected rooms = signal<string[]>([]);

  protected onAddClicked(): void {
    const roomId = Math.ceil(Math.random() * 10000);
    this.rooms.set([...this.rooms(), `Room ${roomId}`]);
  }

  protected onRoomSelected(room: string) {
    this.chat.room.set(room);
  }
}
