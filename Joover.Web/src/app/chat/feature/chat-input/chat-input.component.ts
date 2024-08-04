import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ChatHubService } from '../../data-access/chat-hub.service';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <form
      [formGroup]="form"
      (ngSubmit)="onSubmit()"
      class="flex items-center gap-2"
    >
      <mat-form-field
        class="grow"
        appearance="outline"
        subscriptSizing="dynamic"
      >
        <mat-label>Enter a message</mat-label>
        <input
          matInput
          formControlName="message"
          placeholder="Enter a chat message..."
        />
      </mat-form-field>
      <button mat-fab [disabled]="form.invalid">
        <mat-icon fontIcon="send"></mat-icon>
      </button>
    </form>
  `,
  styles: ``,
})
export class ChatInputComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly chatHub = inject(ChatHubService);

  protected readonly form = this.fb.group({
    message: ['', Validators.required],
  });

  protected onSubmit() {
    const message = this.form.getRawValue().message;
    this.chatHub.sendMessage(message).subscribe(() => {
      this.form.reset();
    });
  }
}
