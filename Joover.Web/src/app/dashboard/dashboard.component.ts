import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InfoCardComponent } from './ui/info-card/info-card.component';
import { ProcessorInfoTileComponent } from './feature/processor-info-tile/processor-info-tile.component';
import { MemoryInfoTileComponent } from './feature/memory-info-tile/memory-info-tile.component';
import { ProcessorUsageTileComponent } from './feature/processor-usage-tile/processor-usage-tile.component';
import { MemoryUsageTileComponent } from './feature/memory-usage-tile/memory-usage-tile.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    InfoCardComponent,
    ProcessorInfoTileComponent,
    MemoryInfoTileComponent,
    ProcessorUsageTileComponent,
    MemoryUsageTileComponent,
  ],
  template: `
    <div class="grid grid-cols-4 gap-2">
      <app-processor-info-tile class="col-span-3" />
      <app-processor-usage-tile />
      <app-memory-info-tile class="col-span-3" />
      <app-memory-usage-tile />
    </div>
  `,
})
export class DashboardComponent {}
