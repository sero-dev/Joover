import { Component, inject } from '@angular/core';
import { MetricCardComponent } from '../../ui/metric-card/metric-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PartHubService } from '../../data-access/part-hub.service';
import { combineLatest, map } from 'rxjs';
import { PartApiService } from '../../data-access/part-api.service';

@Component({
  selector: 'app-memory-usage-tile',
  standalone: true,
  imports: [MetricCardComponent],
  template: `
    <app-metric-card subtitle="Memory Usage">
      <div>{{ memoryUsage().toFixed(0) }}%</div>
    </app-metric-card>
  `,
  styles: ``,
})
export class MemoryUsageTileComponent {
  private readonly partHub = inject(PartHubService);
  private readonly partApi = inject(PartApiService);

  protected memoryUsage = toSignal(
    combineLatest([
      this.partHub.getLiveAvailableMemory(),
      this.partApi.getMemoryInfo(),
    ]).pipe(
      map(
        ([usage, information]) => (1 - usage / information.totalCapacity) * 100
      )
    ),

    {
      initialValue: 0,
    }
  );
}
