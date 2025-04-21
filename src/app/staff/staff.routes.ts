import { Routes } from '@angular/router';
import { ManageStaffComponent } from './manage-staff.component';
import { AssignTasksComponent } from './assign-tasks.component';
import { AttendanceComponent } from './attendance.component';
import { RatingsComponent } from './ratings.component';

const STAFF_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'manage', component: ManageStaffComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'ratings', component: RatingsComponent },
      { path: 'tasks', component: AssignTasksComponent },
      { path: '', redirectTo: 'manage', pathMatch: 'full' }
    ]
  }
];

export default STAFF_ROUTES;
