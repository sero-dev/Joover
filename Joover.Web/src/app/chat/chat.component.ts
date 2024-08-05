import { Component, effect, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChatWindowComponent } from './feature/chat-window/chat-window.component';
import { ChatInputComponent } from './feature/chat-input/chat-input.component';
import { ChatListComponent } from './feature/chat-list/chat-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { StatusIndicatorComponent } from './ui/status-indicator/status-indicator.component';
import { ChatHubService } from './data-access/chat-hub.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatCardModule,
    MatChipsModule,
    ChatWindowComponent,
    ChatInputComponent,
    ChatListComponent,
    StatusIndicatorComponent,
  ],
  template: `
    <div class="h-screen p-4 flex gap-4">
      <app-chat-list class="w-80" />
      <div class="h-full flex flex-col gap-4 grow">
        <div class="flex justify-between items-center">
          <div class="text-2xl mb-0">
            {{ room() ?? 'Select a room' }}
          </div>
          <app-status-indicator [status]="status()"></app-status-indicator>
        </div>
        <app-chat-window style="flex: 1 1 auto; min-height: 0" />
        <app-chat-input />
      </div>
    </div>
  `,
})
export class ChatComponent {
  private readonly chatHub = inject(ChatHubService);

  public room = signal<string | null>(null);
  protected status = toSignal(this.chatHub.getStatus(), {
    initialValue: 'disconnected',
  });

  constructor() {
    effect(
      () => {
        const room = this.room();
        if (room) {
          this.chatHub.connect(room).subscribe();
        }
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
