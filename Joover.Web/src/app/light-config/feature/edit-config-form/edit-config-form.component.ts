import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LightConfigService } from '../../light-config.service';
import { preventNonNumericalInput } from '../../../util/form-util';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-config-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ],
  template: `
    <form
      [formGroup]="form"
      (submit)="onFormSubmitted()"
      class="flex items-center gap-2"
    >
      <mat-form-field class="grow" subscriptSizing="dynamic">
        <mat-label>Choose an instruction</mat-label>
        <mat-select formControlName="instruction">
          <mat-option value="turn on">Turn On</mat-option>
          <mat-option value="toggle">Toggle</mat-option>
          <mat-option value="turn off">Turn Off</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Source X</mat-label>
        <input
          formControlName="sourceX"
          matInput
          type="number"
          min="0"
          max="100"
          (keypress)="onKeyPress($event)"
        />
      </mat-form-field>

      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Source Y</mat-label>
        <input
          formControlName="sourceY"
          matInput
          type="number"
          min="0"
          max="100"
          (keypress)="onKeyPress($event)"
        />
      </mat-form-field>

      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Destination X</mat-label>
        <input
          formControlName="destinationX"
          matInput
          type="number"
          min="0"
          max="100"
          (keypress)="onKeyPress($event)"
        />
      </mat-form-field>

      <mat-form-field subscriptSizing="dynamic">
        <mat-label>Destination Y</mat-label>
        <input
          formControlName="destinationY"
          matInput
          type="number"
          min="0"
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
export class EditConfigFormComponent {
  private readonly lightConfigService = inject(LightConfigService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected onKeyPress = preventNonNumericalInput;
  protected form = this.fb.group({
    instruction: new FormControl('turn on', [Validators.required]),
    sourceX: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    sourceY: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    destinationX: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
    destinationY: new FormControl(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(99),
    ]),
  });

  protected onFormSubmitted() {
    const { instruction, sourceX, sourceY, destinationX, destinationY } =
      this.form.getRawValue();

    if (
      !instruction ||
      sourceX === null ||
      sourceY === null ||
      destinationX === null ||
      destinationY === null
    ) {
      return;
    }

    this.lightConfigService.performInstruction(
      instruction,
      sourceX,
      sourceY,
      destinationX,
      destinationY
    );
  }
}
