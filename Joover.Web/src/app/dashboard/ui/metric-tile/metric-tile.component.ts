import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-tile',
  standalone: true,
  imports: [],
  template: `
    <div class="rounded-2xl bg-white dark:bg-zinc-800 p-4 flex flex-col gap-2">
      <h2 class="font-semibold">{{ title() }}</h2>
      <div class="font-semibold text-3xl">{{ value() }}</div>
      <ng-content select="[icon]" />
      <ng-content select="[caption]" />
    </div>
  `,
})
export class MetricTileComponent {
  public title = input.required<string>();
  public value = input.required<number>();
}
