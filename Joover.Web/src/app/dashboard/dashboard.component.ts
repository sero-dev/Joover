import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InfoCardComponent } from './ui/info-card/info-card.component';
import { ProcessorInfoTileComponent } from './feature/processor-info-tile/processor-info-tile.component';
import { MemoryInfoTileComponent } from './feature/memory-info-tile/memory-info-tile.component';
import { ProcessorUsageTileComponent } from './feature/processor-usage-tile/processor-usage-tile.component';
import { MemoryUsageTileComponent } from './feature/memory-usage-tile/memory-usage-tile.component';
import { WorkflowComponent } from '../workflow/workflow.component';
import { HelloStepComponent } from '../workflow/feature/hello-step/hello-step.component';
import { ResetStepComponent } from '../workflow/feature/reset-step/reset-step.component';
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
    WorkflowComponent,
    HelloStepComponent,
    ResetStepComponent,
  ],
  template: `
    <div class="p-4 grid grid-cols-2 gap-2 max-w-4xl mx-auto">
      <app-processor-info-tile />
      <app-processor-usage-tile />
      <app-memory-info-tile />
      <app-memory-usage-tile />
    </div>

    <app-workflow>
      <app-hello-step #step2 />
      <app-hello-step #step3 />
      <app-hello-step #helloStep />
      <app-reset-step [dependsOn]="[helloStep.directive]" />
    </app-workflow>
  `,
})
export class DashboardComponent {}
