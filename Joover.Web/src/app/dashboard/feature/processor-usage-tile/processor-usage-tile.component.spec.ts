import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorUsageTileComponent } from './processor-usage-tile.component';

describe('ProcessorUsageTileComponent', () => {
  let component: ProcessorUsageTileComponent;
  let fixture: ComponentFixture<ProcessorUsageTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessorUsageTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorUsageTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
