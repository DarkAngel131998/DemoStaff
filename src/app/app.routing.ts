import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/staff' },
  { path: 'staff', loadChildren: () => import('./modules/staff/staff.module').then(m => m.StaffModule) }
];

export const AppRoutes = RouterModule.forRoot(routes);
