import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff.component';
import { StaffDataComponent } from './staff-data/staff-data.component';

const routes: Routes = [
  { path: '', component: StaffComponent },
  { path: 'add', component: StaffDataComponent },
  { path: 'edit/:id', component: StaffDataComponent },
];

export const StaffRoutes = RouterModule.forChild(routes);
