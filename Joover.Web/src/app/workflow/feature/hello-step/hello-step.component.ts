import { Component, inject } from '@angular/core';
import { WorkflowStepDirective } from '../../ui/workflow-step/workflow-step.directive';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hello-step',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    @if(directive.isSelected()) {
    <div class="flex flex-col items-center">
      <h4>Make Sure to Say Hello!</h4>
      <button mat-button (click)="onSayHelloClick()">Say Hello!</button>
    </div>
    }
  `,
  hostDirectives: [WorkflowStepDirective],
})
export class HelloStepComponent {
  public directive = inject(WorkflowStepDirective);

  constructor() {
    this.setHeaderInformation();
  }

  protected onSayHelloClick() {
    this.directive.isCompleted.set(true);
  }

  private setHeaderInformation(): void {
    this.directive.title.set('Say Hello!');
    this.directive.description.set('This is a description');
    this.directive.icon.set('send');
    this.directive.isCompleted.set(false);
  }
}
