import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightConfigComponent } from './light-config.component';

describe('LightConfigComponent', () => {
  let component: LightConfigComponent;
  let fixture: ComponentFixture<LightConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
