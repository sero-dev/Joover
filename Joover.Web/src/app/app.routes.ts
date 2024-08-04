import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    title: getTitle('Dashboard'),
  },
  {
    path: 'chat',
    loadComponent: () =>
      import('./chat/chat.component').then((m) => m.ChatComponent),
    title: getTitle('Chat'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

function getTitle(name: string) {
  return `Joover Monitoring | ${name}`;
}
