import { Routes } from '@angular/router';
import { FestiveCommitteeComponent } from './festive-committee.component';
import { FestiveEventComponent } from './festive-event.component';
import { FestiveExpenseComponent } from './festive-expense.component';
import { FestiveFeedbackComponent } from './festive-feedback.component';
import { FestiveFundContributionComponent } from './festive-fund-contribution.component';
import { FestiveNotificationComponent } from './festive-notification.component';
import { FestivePollComponent } from './festive-poll.component';
import { FestivePollVoteComponent } from './festive-poll-vote.component';
import { FestivePrizeComponent } from './festive-prize.component';
import { FestiveThankyouNoteComponent } from './festive-thankyou-note.component';
import { FestiveVolunteerComponent } from './festive-volunteer.component';

const routes: Routes = [
              { path: 'committee', component: FestiveCommitteeComponent },
              { path: 'events', component: FestiveEventComponent },
              { path: 'expenses', component: FestiveExpenseComponent },
              { path: 'feedbacks', component: FestiveFeedbackComponent },
              { path: 'fund-contributions', component: FestiveFundContributionComponent },
              { path: 'notifications', component: FestiveNotificationComponent },
              { path: 'polls', component: FestivePollComponent },
              { path: 'poll-votes', component: FestivePollVoteComponent },
              { path: 'prizes', component: FestivePrizeComponent },
              { path: 'thankyou-notes', component: FestiveThankyouNoteComponent },
              { path: 'volunteers', component: FestiveVolunteerComponent }
];

export default routes;
