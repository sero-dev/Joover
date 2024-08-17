import { Component, inject } from '@angular/core';
import { LightConfigService } from './light-config.service';
import { CreateConfigFormComponent } from './feature/create-config-form/create-config-form.component';
import { NgClass } from '@angular/common';
import { EditConfigFormComponent } from './feature/edit-config-form/edit-config-form.component';

@Component({
  selector: 'app-light-config',
  standalone: true,
  imports: [CreateConfigFormComponent, NgClass, EditConfigFormComponent],
  providers: [LightConfigService],
  template: `
    <div class="w-full max-w-[1200px] mx-auto flex flex-col gap-4 p-4">
      <app-create-config-form />

      <div class="flex flex-col gap-0.5">
        @for (row of config(); track $index; let y = $index) {
        <div class="flex justify-center gap-0.5">
          @for (col of row; track $index; let x = $index) {
          <div
            [ngClass]="{ 'bg-green-600': col, 'bg-zinc-900': !col }"
            class="w-2 h-2 border border-zinc-700 rounded-md hover:bg-zinc-600 hover:cursor-pointer"
            [title]="x + ',' + y"
          ></div>
          }
        </div>
        }
      </div>
      <app-edit-config-form />
    </div>
  `,
})
export class LightConfigComponent {
  private readonly lightConfigService = inject(LightConfigService);

  protected readonly config = this.lightConfigService.config;
}

export interface Person {
  id: number;
  name: string;
}
