import { Component, inject } from '@angular/core';
import { PartHubService } from '../../data-access/part-hub.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MetricCardComponent } from '../../ui/metric-card/metric-card.component';

@Component({
  selector: 'app-processor-usage-tile',
  standalone: true,
  imports: [MatCardModule, MetricCardComponent],
  template: `
    <app-metric-card subtitle="CPU Usage">
      <div>{{ processorUsage().toFixed(0) }}%</div>
    </app-metric-card>
  `,
  styles: ``,
})
export class ProcessorUsageTileComponent {
  private readonly partHub = inject(PartHubService);

  protected processorUsage = toSignal(this.partHub.getLiveProcessorUsage(), {
    initialValue: 0,
  });
}