import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryInfoTileComponent } from './memory-info-tile.component';

describe('MemoryInfoTileComponent', () => {
  let component: MemoryInfoTileComponent;
  let fixture: ComponentFixture<MemoryInfoTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryInfoTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemoryInfoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
