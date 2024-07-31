import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgClass],
  template: `
    <div [ngClass]="{ dark: darkMode() }" class="h-screen w-screen p-4 bg-gray-200 dark:bg-zinc-900 dark:text-white">
      <div class="flex justify-end">
        <button
          class="rounded border border-zinc-500 px-2 py-1 hover:bg-gray-300 active:bg-gray-400 dark:hover:bg-zinc-800 dark:active:bg-zinc-700"
          (click)="darkMode.set(!darkMode())"
        >
          Switch to {{ darkMode() ? 'Light' : 'Dark' }} Mode
        </button>
      </div>
      <router-outlet />
    </div>
  `,
  styles: [],
})
export class AppComponent {
  protected darkMode = signal<boolean>(true);
}
