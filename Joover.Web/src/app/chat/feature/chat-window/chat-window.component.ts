import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { scan } from 'rxjs';
import { ChatHubService, Message } from '../../data-access/chat-hub.service';
import { MatCardModule } from '@angular/material/card';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MatCardModule, JsonPipe],
  template: `
    <mat-card class="h-full overflow-y-auto" appearance="outlined">
      <mat-card-content class="mt-auto">
        <div class="flex flex-col justify-end gap-2">
          @for(message of messages(); track message) {
          <mat-card class="w-96" appearance="outlined">
            <mat-card-header>
              <mat-card-title class="mat-body-small">{{
                message.username
              }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              {{ message.text }}
            </mat-card-content>
          </mat-card>
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    :host { height: 100% }
  `,
})
export class ChatWindowComponent {
  private readonly chatHub = inject(ChatHubService);

  protected messages = toSignal(
    this.chatHub
      .getMessages()
      .pipe(
        scan((messages, message) => [...messages, message], [] as Message[])
      )
  );
}
