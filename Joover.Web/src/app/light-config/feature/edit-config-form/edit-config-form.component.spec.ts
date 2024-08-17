import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigFormComponent } from './edit-config-form.component';

describe('EditConfigFormComponent', () => {
  let component: EditConfigFormComponent;
  let fixture: ComponentFixture<EditConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConfigFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
