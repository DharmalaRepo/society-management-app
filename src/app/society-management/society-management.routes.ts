// src/app/society-management/society-management.routes.ts
import { Routes } from '@angular/router';
import { SocietyMasterComponent } from './society-master/society-master.component';
import { FlatsComponent } from './flats/flats.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { ParkingComponent } from './parking/parking.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
         { path: '', pathMatch: 'full', redirectTo: 'master' },
         { path: 'master', component: SocietyMasterComponent },
         { path: 'flats', component: FlatsComponent },
         { path: 'amenities', component: AmenitiesComponent },
         { path: 'parking', component: ParkingComponent },
         { path: 'maintenance', component: MaintenanceComponent },
];

export default routes;
