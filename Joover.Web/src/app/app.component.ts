import { Component } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, RouterOutlet],
  template: `
    <div >
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {}
