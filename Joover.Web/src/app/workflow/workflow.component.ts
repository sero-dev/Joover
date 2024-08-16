import { Component, contentChildren, effect } from '@angular/core';
import { WorkflowStepHeaderComponent } from './ui/workflow-step-header/workflow-step-header.component';
import { WorkflowStepDirective } from './ui/workflow-step/workflow-step.directive';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [WorkflowStepHeaderComponent],
  template: `
    <div class="p-10 max-w-[1200px] mx-auto">
      <div class="h-[2px] w-full border border-zinc-500 relative top-5"></div>
      <div class="flex justify-between relative z-10 mb-10">
        @for(step of steps(); track step) {
        <app-workflow-step-header
          (click)="stepSelected(step)"
          [title]="step.title()"
          [description]="step.description()"
          [icon]="step.icon()"
          [isSelected]="step.isSelected()"
          [isCompleted]="step.isCompleted()"
          [disabled]="step.disabled()"
        ></app-workflow-step-header>
        }
      </div>
      <div #stepsContainer>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class WorkflowComponent {
  public steps = contentChildren(WorkflowStepDirective);

  constructor() {
    effect(
      () => {
        const anyStepCompleted = this.steps()
          .map((step) => step.isCompleted())
          .some(Boolean);
        if (anyStepCompleted) this.selectFirstIncompletedStep();
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        const noStepsSelected = !this.steps()
          .map((step) => step.isSelected())
          .some(Boolean);

        if (noStepsSelected) this.selectFirstIncompletedStep();
      },
      { allowSignalWrites: true }
    );
  }

  public selectFirstIncompletedStep() {
    const nextStep = this.steps().find((step) => !step.isCompleted());
    if (nextStep) {
      this.stepSelected(nextStep);
    }
  }

  protected stepSelected(step: WorkflowStepDirective) {
    if (!step.disabled()) {
      this.steps().forEach((step) => step.isSelected.set(false));
      step.isSelected.set(true);
    }
  }
}
