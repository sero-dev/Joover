import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessorInfoTileComponent } from './processor-info-tile.component';

describe('ProcessorInfoTileComponent', () => {
  let component: ProcessorInfoTileComponent;
  let fixture: ComponentFixture<ProcessorInfoTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessorInfoTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessorInfoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
