import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryUsageTileComponent } from './memory-usage-tile.component';

describe('MemoryUsageTileComponent', () => {
  let component: MemoryUsageTileComponent;
  let fixture: ComponentFixture<MemoryUsageTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryUsageTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryUsageTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
