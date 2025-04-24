import { Routes } from '@angular/router';
import { PaymentsComponent } from './payments.component';
import { DefaultersComponent } from './defaulters.component';
import { ExpendituresComponent } from './expenditures.component';
import { TransactionsComponent } from './transactions.component';
import { BudgetsComponent } from './budgets.component';

const routes: Routes = [
        { path: 'payments', component: PaymentsComponent },
        { path: 'transactions', component: TransactionsComponent },
        { path: 'budgets', component: BudgetsComponent },
        { path: 'defaulters', component: DefaultersComponent },
        { path: 'expenditures', component: ExpendituresComponent }
];

export default routes;
