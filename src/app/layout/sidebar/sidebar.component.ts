import { Component, inject, signal, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'src/app/core/services/auth.service';

interface SidebarItem {
  label: string;
  route: string;
  icon?: string;
}

interface SidebarSection {
  label: string;
  icon: string;
  children: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    NgIf,
    NgFor,
    NgClass,
    RouterModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule
  ]
})

export class SidebarComponent {
  @Input() collapsed = false;
  private auth = inject(AuthService);
  private userRoles = signal<string[]>([]);

  constructor() {
    //const user = JSON.parse(localStorage.getItem('user') || '{}');
    //this.userRoles.set(user?.roles || []);
    // 🔐 Hardcoded for testing as 'ADMIN'
    this.userRoles.set(['ADMIN', 'RESIDENT']);
  }


  roleMap: Record<string, string[]> = {
    '/finance/payments': ['ADMIN', 'TREASURER'],
    '/finance/defaulters': ['ADMIN'],
    '/association/members': ['ADMIN', 'ASSOC_MEMBER'],
    '/staff/tasks': ['ADMIN','STAFF_ADMIN'],
    '/events/list': ['ADMIN','EVENT_ADMIN'],
    '/grievances/all': ['ADMIN', 'RESIDENT'],
    '/residents/polls': ['ADMIN', 'RESIDENT'],
  };


  sidebarSections: SidebarSection[] = [
      {
        label: 'Society Management',
        icon: 'apartment',
        children: [
          { label: 'Society Details', route: '/society-management/master' },
          { label: 'Flats', route: '/society-management/flats' },
          { label: 'Amenities', route: '/society-management/amenities' },
          { label: 'Parking', route: '/society-management/parking' },
          { label: 'Maintenance', route: '/society-management/maintenance' },
        ]
      },
      {
        label: 'My Account',
        icon: 'person',
        children: [
          { label: 'My Flat Info', route: '/my-account/flat-info', icon: 'home' },
          { label: 'My Payments', route: '/my-account/payments', icon: 'receipt' },
          { label: 'My Receipts', route: '/my-account/receipts', icon: 'download' },
          { label: 'My Vehicles', route: '/my-account/vehicles', icon: 'directions_car' },
          { label: 'My Visitors', route: '/my-account/visitors', icon: 'badge' },
          { label: 'My Grievances', route: '/my-account/grievances', icon: 'report' },
          { label: 'Communication Preferences', route: '/my-account/preferences', icon: 'settings' },
          { label: 'Panic Settings', route: '/my-account/security', icon: 'security' },
          { label: 'Proof of Residence', route: '/my-account/proof', icon: 'picture_as_pdf' }
        ]
      },
     {
       label: 'Visitor Authentication',
       icon: 'key',
       children: [
           { label: 'Generate OTP', icon: 'add_circle', route: '/visitor-auth/generate-otp' },
           { label: 'Verify OTP', icon: 'verified_user', route: '/visitor-auth/verify-otp' },
           { label: 'Visitor Logs', icon: 'assignment', route: '/visitor-auth/logs' },
           { label: 'Approval Requests', icon: 'how_to_reg', route: '/visitor-auth/approval-requests' },
           { label: 'Recurring Passes', icon: 'schedule', route: '/visitor-auth/recurring-pass' },
           { label: 'Blacklist Visitors', icon: 'block', route: '/visitor-auth/blacklist' },
           { label: 'Visitor Analytics', icon: 'bar_chart', route: '/visitor-auth/analytics' },
           { label: 'Request Approval', icon: 'login', route: '/visitor-auth/request-approval' }
         ]
     },
      {
        label: 'Society Association',
        icon: 'group',
        children: [
          { label: 'Notifications', route: '/association/notifications' },
          { label: 'Minutes of Meeting', route: '/association/mom' },
          { label: 'Member Efforts', route: '/association/efforts' },
          { label: 'Communication Logs', route: '/association/logs' },
          { label: 'Association Tasks', route: '/association/tasks' },
          { label: 'Association Members', route: '/association/members' },
          { label: 'Association Meetings', route: '/association/meetings' }
        ]
      },
      {
        label: 'Resident Services',
        icon: 'people',
        children: [
          { label: 'Residents', route: '/residents/list'},
          { label: 'Vehicles', route: '/residents/vehicles'  },
          { label: 'Alerts & Reminders', route: '/residents/alerts'},
          { label: 'Broadcast Messages', route: '/residents/messages'},
          { label: 'Directory', icon: 'contacts', route: '/residents/directory' }
        ]
      },
      {
        label: 'Finance',
        icon: 'account_balance_wallet',
        children: [
          { label: 'Payments', route: '/finance/payments'},
          { label: 'Defaulters', route: '/finance/defaulters'},
          { label: 'Expenditures', route: '/finance/expenditures'},
          { label: 'Budgets', route: '/finance/budgets'},
          { label: 'Transactions', route: '/finance/transactions'},
          { label: 'Income Sources', route: '/finance/income-sources'},
          { label: 'Payment Categories', route: '/finance/payment-categories'  }
        ]
      },
      {
        label: 'Grievances',
        icon: 'report_problem',
        children: [
          { label: 'List Grievances', route: '/grievances/all'},
          { label: 'Add Grievance', route: '/grievances/add'},
          { label: 'Grievance History', route: '/grievances/history'}
        ]
      },
      {
        label: 'Events & Festive',
        icon: 'celebration',
        children: [
          { label: 'Events', route: 'events/events'},
                          { label: 'Committees', route: 'events/committee' },
                           { label: 'Expenses', route: 'events/expenses'},
                           { label: 'Feedback', route: 'events/feedbacks' },
                          { label: 'Fund Contributions', route: 'events/fund-contributions' },
                         { label: 'Notifications', route: 'events/notifications' },
                         { label: 'Polls', route: 'events/polls'},
                         { label: 'Poll Vote', route: 'events/poll-votes'},
                          { label: 'Volunteers', route: 'events/volunteers' },
                          { label: 'Prizes', route: 'events/prizes' },
                          { label: 'Thank you', route: 'events/thankyou-notes' }
        ]
      },
      {
        label: 'Staff Management',
        icon: 'engineering',
        children: [
          { label: 'manage', route: '/staff/manage' }, // ✅ match route
          { label: 'ratings', route: '/staff/ratings' },
          { label: 'attendance', route: '/staff/attendance' },
          { label: 'tasks', route: '/staff/tasks' },
          // { label: 'Analytics', route: '/staff/analytics' } ← Remove or add route in routes file
        ]
      }
    ];


isVisible(item: SidebarItem): boolean {
    const requiredRoles = this.roleMap[item.route] || [];
    return requiredRoles.length === 0 || requiredRoles.some(role => this.userRoles().includes(role));
  }

  visibleChildren(section: SidebarSection): SidebarItem[] {
    return section.children.filter(child => this.isVisible(child));
  }



}
