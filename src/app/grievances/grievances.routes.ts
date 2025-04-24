import { Routes } from '@angular/router';
import { GrievancesComponent } from './grievances.component';
import { GrievanceDialogComponent } from './dialogs/grievance-dialog.component';

export const grievancesRoutes: Routes = [
  {
    path: 'all',
    component: GrievancesComponent,
    title: 'List Grievances',
  },
  {
    path: 'add',
    component: GrievanceDialogComponent,
    title: 'Add Grievance',
  },
  {
    path: 'history',
    component: GrievancesComponent,
    title: 'Grievance History',
    data: { view: 'history' } // optional flag to differentiate view mode
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  }
];
