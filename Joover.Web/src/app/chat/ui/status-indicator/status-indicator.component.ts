import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { Status } from '../../data-access/chat-hub.service';

@Component({
  selector: 'app-status-indicator',
  standalone: true,
  imports: [MatChipsModule, NgClass, TitleCasePipe],
  template: `
    <mat-chip disabled>
      <div class="flex items-center gap-2">
        <div
          [ngClass]="{
            'bg-green-500': status() === 'connected',
            'bg-red-500': status() === 'disconnected',
            'bg-orange-400': status() === 'connecting',
            'animate-pulse': status() === 'connecting'
          }"
          class="w-2 h-2 rounded-full"
        ></div>
        <span>{{ status() | titlecase }}</span>
      </div>
    </mat-chip>
  `,
  styles: ``,
})
export class StatusIndicatorComponent {
  public status = input.required<Status>();
}
