import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-workflow-step-header',
  standalone: true,
  imports: [MatIconModule, NgClass],
  template: `
    <div
      class="flex flex-col items-center w-52 text-center hover:cursor-pointer group"
    >
      <div
        class="px-4"
        style="background: var(--mat-app-background-color, transparent)"
      >
        <div
          [ngClass]="{
            'bg-blue-700': !isCompleted() && isSelected() && !disabled(),
            'bg-blue-500': !isCompleted() && !isSelected() && !disabled(),
            'bg-zinc-600': disabled() && !isCompleted(),
            'bg-green-700': isCompleted()
          }"
          class="rounded-full h-10 w-10 flex justify-center items-center bg-zinc-600 mb-2"
        >
          @if(isCompleted()) {
          <mat-icon class="scale-75 text-green-200" fontIcon="check"></mat-icon>
          } @else if (disabled()) {
          <mat-icon class="scale-75" fontIcon="lock"></mat-icon>
          }@else {
          <mat-icon class="scale-75" [fontIcon]="icon()"></mat-icon>
          }
        </div>
      </div>

      <div [ngClass]="{ 'group-hover:text-blue-300': !disabled() }">
        <h3 class="mat-body-large ">{{ title() }}</h3>
        <p class="mat-body-small">{{ description() }}</p>
      </div>
    </div>
  `,
})
export class WorkflowStepHeaderComponent {
  public title = input.required<string>();
  public description = input.required<string>();
  public icon = input.required<string>();

  public isCompleted = input<boolean>(false);
  public isSelected = input<boolean>(false);
  public disabled = input<boolean>(false);
}
