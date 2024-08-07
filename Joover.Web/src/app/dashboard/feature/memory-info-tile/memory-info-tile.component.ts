import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, map } from 'rxjs';
import {
  PartApiService,
  MemoryInformation,
} from '../../data-access/part-api.service';
import { InfoCardComponent } from '../../ui/info-card/info-card.component';

@Component({
  selector: 'app-memory-info-tile',
  standalone: true,
  imports: [InfoCardComponent],
  template: `
    @if(memoryView().information; as memory) {
    <app-info-card
      title="Memory name not available"
      subtitle="Memory Information"
    >
      <div>Total Memory: {{ memory.totalCapacity / 1024 + 'GB' }}</div>
      <div>Voltage: {{ memory.voltage / 1000 + 'V' }}</div>
      <div>Clock Speed: {{ memory.clockSpeed + 'MHz' }}</div>
    </app-info-card>
    } @else if (memoryView().error) {
    <app-info-card title="Error" subtitle="Memory Information">
      <div class="text-red-500">Error could not load Memory Information</div>
    </app-info-card>
    } @else {
    <app-info-card title="Loading..." subtitle="Memory Information...">
      <div>Loading...</div>
    </app-info-card>
    }
  `,
})
export class MemoryInfoTileComponent {
  private readonly partApi = inject(PartApiService);

  protected memoryView: Signal<MemoryView> = toSignal(
    this.partApi.getMemoryInfo().pipe(
      map(
        (response) =>
          ({
            information: response,
            error: null,
          } as MemoryView)
      ),
      catchError(() =>
        of<MemoryView>({
          information: undefined,
          error: 'Failed to retrieve memory information',
        })
      )
    ),
    {
      initialValue: {
        information: undefined,
        error: null,
      } as MemoryView,
    }
  );
}

interface MemoryView {
  information: MemoryInformation | undefined;
  error: null | string;
}
