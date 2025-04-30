import { Routes } from '@angular/router';
import { GenerateOtpComponent } from './generate-otp/generate-otp.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { VisitorLogsComponent } from './logs/visitor-logs.component';
import { VisitorApprovalRequestsComponent } from './approval-requests/visitor-approval-requests.component';
import { RecurringPassComponent } from './recurring-pass/recurring-pass.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { VisitorAnalyticsComponent } from './analytics/visitor-analytics.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';

const routes: Routes = [
  { path: 'generate-otp', component: GenerateOtpComponent },
    { path: 'verify-otp', component: VerifyOtpComponent },
    { path: 'logs', component: VisitorLogsComponent },
    { path: 'approval-requests', component: VisitorApprovalRequestsComponent },
    { path: 'recurring-pass', component: RecurringPassComponent },
    { path: 'blacklist', component: BlacklistComponent },
    { path: 'analytics', component: VisitorAnalyticsComponent },
    { path: 'request-approval', component: RequestApprovalComponent }
];

export default routes;
