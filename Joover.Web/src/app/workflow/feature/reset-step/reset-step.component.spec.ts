import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetStepComponent } from './reset-step.component';

describe('ResetStepComponent', () => {
  let component: ResetStepComponent;
  let fixture: ComponentFixture<ResetStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
