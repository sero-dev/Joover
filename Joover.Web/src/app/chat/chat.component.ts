import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChatWindowComponent } from './feature/chat-window/chat-window.component';
import { ChatInputComponent } from './feature/chat-input/chat-input.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatCardModule, ChatWindowComponent, ChatInputComponent],
  template: `
    <div class="h-screen p-4 flex flex-col gap-4">
      <app-chat-window style="flex: 1 1 auto; min-height: 0" />
      <app-chat-input />
    </div>
  `,
})
export class ChatComponent {}
