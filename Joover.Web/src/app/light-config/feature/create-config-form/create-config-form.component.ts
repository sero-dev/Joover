import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  NonNullableFormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LightConfigService } from '../../light-config.service';
import { preventNonNumericalInput } from '../../../util/form-util';

@Component({
  selector: 'app-create-config-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  template: `
    <form
      [formGroup]="form"
      (submit)="onFormSubmitted()"
      class="flex items-center gap-2"
    >
      <mat-form-field class="grow" subscriptSizing="dynamic">
        <mat-label>Row Count</mat-label>
        <input
          formControlName="row"
          matInput
          type="number"
          min="1"
          max="100"
          (keypress)="onKeyPress($event)"
        />
      </mat-form-field>

      <mat-form-field class="grow" subscriptSizing="dynamic">
        <mat-label>Column Count</mat-label>
        <input
          formControlName="column"
          matInput
          type="number"
          min="1"
          max="100"
          (keypress)="onKeyPress($event)"
        />
      </mat-form-field>

      <button mat-fab [disabled]="form.untouched && form.invalid">
        <mat-icon fontIcon="construction">Create</mat-icon>
      </button>
    </form>
  `,
  styles: ``,
})
export class CreateConfigFormComponent {
  private readonly lightConfigService = inject(LightConfigService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected onKeyPress = preventNonNumericalInput;
  protected form = this.fb.group({
    row: new FormControl(this.lightConfigService.config().length, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
    column: new FormControl(this.lightConfigService.config()[0]?.length ?? 0, [
      Validators.required,
      Validators.min(1),
      Validators.max(100),
    ]),
  });

  protected onFormSubmitted() {
    const { row, column } = this.form.getRawValue();

    if (!row || !column) {
      console.log('Failed', row, column);
      return;
    }

    this.lightConfigService.createNewConfig(row, column);
    this.form.markAsUntouched();
  }
}
