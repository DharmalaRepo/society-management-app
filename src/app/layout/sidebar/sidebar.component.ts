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
          { label: 'Parking Management', route: '/society/parking'},
          { label: 'Maintenance Settings', route: '/society/maintenance' },
          { label: 'Flat Management', route: '/society/flats' },
          { label: 'Amenity Management', route: '/society/amenities' }
        ]
      },
     {
       label: 'Visitor Authentication',
       icon: 'key',
       children: [
         { label: 'Generate Token', route: '/visitor-auth/generate-token' },
         { label: 'Verify Token', route: '/visitor-auth/verify-token' },
         { label: 'Token List', route: '/visitor-auth/token-list' },
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
          { label: 'Polls', route: '/residents/polls'},
          { label: 'Guest Visit Logs', route: '/residents/guests'},
          { label: 'Broadcast Messages', route: '/residents/messages'}
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
          { label: 'Events', route: '/events/list'},
          { label: 'Fund Contributions', route: '/events/fund' },
          { label: 'Expenses', route: '/events/expenses'},
          { label: 'Feedback', route: '/events/feedback' },
          { label: 'Committees', route: '/events/committees' },
          { label: 'Volunteers', route: '/events/volunteers' },
          { label: 'Poll Results', route: '/events/polls'},
          { label: 'Notifications', route: '/events/notifications' }
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
