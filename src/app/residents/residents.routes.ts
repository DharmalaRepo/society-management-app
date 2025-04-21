import { Routes } from '@angular/router';
import { ResidentsComponent } from './residents.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PollsComponent } from './polls/polls.component';
import { GuestsComponent } from './guests/guests.component';
import { MessagesComponent } from './messages/messages.component';
import { AlertsComponent } from './alerts/alerts.component';

const routes: Routes = [
  { path: 'list', component: ResidentsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'polls', component: PollsComponent },
  { path: 'guests', component: GuestsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'alerts', component: AlertsComponent }
];

export default routes;
