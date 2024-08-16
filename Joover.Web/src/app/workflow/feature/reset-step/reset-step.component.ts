import { Component, inject } from '@angular/core';
import { WorkflowStepDirective } from '../../ui/workflow-step/workflow-step.directive';
import { MatButton } from '@angular/material/button';
import { WorkflowComponent } from '../../workflow.component';

@Component({
  selector: 'app-reset-step',
  standalone: true,
  imports: [MatButton],
  template: `
    @if(this.directive.isSelected()) {
    <div class="flex flex-col items-center">
      <h4>Reset the Workflow</h4>
      <button mat-button (click)="onResetWorkflowClick()">
        Reset Workflow
      </button>
    </div>
    }
  `,
  hostDirectives: [
    {
      directive: WorkflowStepDirective,
      inputs: ['dependsOn'],
    },
  ],
})
export class ResetStepComponent {
  protected workflow = inject(WorkflowComponent);
  protected directive = inject(WorkflowStepDirective);

  constructor() {
    this.setHeaderInformation();
  }

  protected onResetWorkflowClick() {
    this.workflow.steps().forEach((step) => step.isCompleted.set(false));
    this.workflow.selectFirstIncompletedStep();
  }

  private setHeaderInformation(): void {
    this.directive.title.set('Reset Workflow');
    this.directive.description.set(
      'This should reset the workflow to an incomplete state'
    );
    this.directive.icon.set('refresh');
    this.directive.isCompleted.set(false);
  }
}
