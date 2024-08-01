import { Component, inject, Signal } from '@angular/core';
import { InfoCardComponent } from '../../ui/info-card/info-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, map } from 'rxjs';
import { PartApiService, ProcessorInformation } from '../../data-access/part-api.service';

@Component({
  selector: 'app-processor-info-tile',
  standalone: true,
  imports: [InfoCardComponent],
  template: `
    @if(processorView().information; as processor) {
    <app-info-card [title]="processor.name" subtitle="CPI Information">
      <div>Cores: {{ processor.coreCount }}</div>
      <div>Logical Processors: {{ processor.logicalProcessorCount }}</div>
      <div>Max Clock Speed: {{ processor.maxClockSpeed / 1000 + 'GHz' }}</div>
      <div>L2 Cache Size: {{ processor.l2CacheSize / 1024 + 'MB' }}</div>
      <div>L3 Cache Size: {{ processor.l3CacheSize / 1024 + 'MB' }}</div>
    </app-info-card>
    }
  `,
})
export class ProcessorInfoTileComponent {
  private readonly partApi = inject(PartApiService);

  protected processorView: Signal<ProcessorView> = toSignal(
    this.partApi.getProcessorInfo().pipe(
      catchError(() =>
        of<ProcessorView>({
          information: undefined,
          error: 'Failed to retrieve CPU information',
        })
      ),
      map(
        (response) =>
          ({
            information: response,
            error: null,
          } as ProcessorView)
      )
    ),
    {
      initialValue: {
        information: undefined,
        error: null,
      } as ProcessorView,
    }
  );
}

interface ProcessorView {
  information: ProcessorInformation | undefined;
  error: null | string;
}
