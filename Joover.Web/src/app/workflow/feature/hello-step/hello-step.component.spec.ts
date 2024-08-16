import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloStepComponent } from './hello-step.component';

describe('HelloStepComponent', () => {
  let component: HelloStepComponent;
  let fixture: ComponentFixture<HelloStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelloStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
