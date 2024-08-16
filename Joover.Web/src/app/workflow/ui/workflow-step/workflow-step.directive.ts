import { computed, Directive, input, signal } from '@angular/core';

@Directive({
  selector: '[appWorkflowStep]',
  standalone: true,
})
export class WorkflowStepDirective {
  public readonly title = signal<string>('');
  public readonly description = signal<string>('');
  public readonly icon = signal<string>('');
  public readonly isCompleted = signal<boolean>(false);
  public readonly isSelected = signal<boolean>(false);

  public readonly dependsOn = input<WorkflowStepDirective[]>([]);
  public readonly disabled = computed(() => {
    return this.dependsOn()
      .map((dependency) => dependency.isCompleted())
      .some((isCompleted) => !isCompleted);
  });
}
