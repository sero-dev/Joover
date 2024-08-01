import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InfoCardComponent } from './ui/info-card/info-card.component';
import { ProcessorInfoTileComponent } from './feature/processor-info-tile/processor-info-tile.component';
import { MemoryInfoTileComponent } from './feature/memory-info-tile/memory-info-tile.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, InfoCardComponent, ProcessorInfoTileComponent, MemoryInfoTileComponent],
  template: `
    <div class="grid grid-cols-4 gap-2">
      <app-processor-info-tile />
      <app-memory-info-tile />
    </div>
  `,
})
export class DashboardComponent {}
