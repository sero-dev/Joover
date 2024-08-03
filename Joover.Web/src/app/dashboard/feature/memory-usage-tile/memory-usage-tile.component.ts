import { Component, inject, Signal } from '@angular/core';
import { MetricCardComponent } from '../../ui/metric-card/metric-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { PartHubService } from '../../data-access/part-hub.service';
import { catchError, combineLatest, map, of } from 'rxjs';
import { PartApiService } from '../../data-access/part-api.service';

@Component({
  selector: 'app-memory-usage-tile',
  standalone: true,
  imports: [MetricCardComponent],
  template: `
    @if(memoryUsageView().usage; as usage) {
    <app-metric-card subtitle="Memory Usage">
      <div>{{ usage.toFixed(0) }}%</div>
    </app-metric-card>
    } @else if (memoryUsageView().error) {
    <app-metric-card subtitle="Memory Usage">
      <div class="text-red-500">Error</div>
    </app-metric-card>
    } @else {
    <app-metric-card subtitle="Memory Usage">
      <div>Error</div>
    </app-metric-card>
    }
  `,
  styles: ``,
})
export class MemoryUsageTileComponent {
  private readonly partHub = inject(PartHubService);
  private readonly partApi = inject(PartApiService);

  protected memoryUsageView: Signal<MemoryUsageView> = toSignal(
    combineLatest([
      this.partHub.getLiveAvailableMemory(),
      this.partApi.getMemoryInfo(),
    ]).pipe(
      map(
        ([usage, information]) =>
          ({
            usage: (1 - usage / information.totalCapacity) * 100,
            error: null,
          } as MemoryUsageView)
      ),
      catchError(() =>
        of<MemoryUsageView>({
          usage: undefined,
          error: 'Failed to get memory usage',
        })
      )
    ),
    {
      initialValue: {
        usage: undefined,
        error: null,
      } as MemoryUsageView,
    }
  );
}

interface MemoryUsageView {
  usage: number | undefined;
  error: string | null;
}
