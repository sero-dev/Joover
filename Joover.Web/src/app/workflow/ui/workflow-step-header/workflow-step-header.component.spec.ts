import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStepHeaderComponent } from './workflow-step-header.component';

describe('WorkflowStepHeaderComponent', () => {
  let component: WorkflowStepHeaderComponent;
  let fixture: ComponentFixture<WorkflowStepHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowStepHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowStepHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
