import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="h-full" appearance="outlined">
      <mat-card-header>
        <mat-card-subtitle class="mat-body-small">{{ subtitle() }}</mat-card-subtitle>
        <mat-card-title class="h-16 mat-title-medium">{{ title() }}</mat-card-title>
      </mat-card-header>
      <mat-card-content class="mt-4 mat-body-medium">
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
})
export class InfoCardComponent {
  public title = input.required<string>();
  public subtitle = input.required<string>();
}
