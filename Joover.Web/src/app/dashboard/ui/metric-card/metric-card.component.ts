import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card class="h-full" appearance="outlined">
      <mat-card-header>
        <mat-card-subtitle class="mat-body-small">{{
          subtitle()
        }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content
        class="mt-auto text-9xl flex justify-center items-center"
      >
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
})
export class MetricCardComponent {
  public subtitle = input.required<string>();
}
