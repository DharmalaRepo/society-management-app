import { Routes } from '@angular/router';
import { ResidentsComponent } from './residents.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { MessagesComponent } from './messages/messages.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ResidentDirectoryComponent } from './directory/resident-directory.component';

const routes: Routes = [
  { path: 'list', component: ResidentsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: 'directory', component: ResidentDirectoryComponent }
];

export default routes;
