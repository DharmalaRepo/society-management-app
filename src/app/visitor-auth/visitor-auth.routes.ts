import { Routes } from '@angular/router';
import { GenerateTokenComponent } from './generate-token/generate-token.component';
import { VerifyTokenComponent } from './verify-token/verify-token.component';
import { TokenListComponent } from './token-list/token-list.component';
import { TokenDetailsComponent } from './token-details/token-details.component';

const routes: Routes = [
  { path: 'generate-token', component: GenerateTokenComponent },
  { path: 'verify-token', component: VerifyTokenComponent },
  { path: 'token-list', component: TokenListComponent },
  { path: 'token-details/:id', component: TokenDetailsComponent }

];

export default routes;
