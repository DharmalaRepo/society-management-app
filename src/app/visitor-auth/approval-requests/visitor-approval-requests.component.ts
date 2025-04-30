import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { interval, Subscription } from 'rxjs';
import { VisitorEntry } from 'src/app/core/models/visitor-auth/visitor-entry.model';
import { VisitorAuthService } from 'src/app/core/services/visitor-auth/visitor-auth.service';
import { ApprovalDialogComponent } from '../dialogs/approval-dialog.component';

@Component({
  selector: 'app-visitor-approval-requests',
  standalone: true,
  templateUrl: './visitor-approval-requests.component.html',
  styleUrls: ['./visitor-approval-requests.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ApprovalDialogComponent
  ]
})
export class VisitorApprovalRequestsComponent implements OnInit, OnDestroy {
  private service = inject(VisitorAuthService);
  private dialog = inject(MatDialog);

  approvalRequests: VisitorEntry[] = [];
  displayedColumns: string[] = ['flatNumber', 'visitorName', 'purpose', 'approvalRequestedAt', 'actions'];
  private refreshSub?: Subscription;

  ngOnInit(): void {
    this.service.getPendingRequests().subscribe({
      next: (entries) => {
        console.log('All visitor entries:', entries);

        this.approvalRequests = entries.filter(e =>
          e.approvalRequested === true &&
          e.approvedByResident !== true &&
          e.rejectedByResident !== true
        );

        console.log('Filtered approval requests:', this.approvalRequests);
      },
      error: (err) => {
        console.error('Error fetching approval requests:', err);
      }
    });
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  fetchApprovalRequests(): void {
    this.service.getPendingRequests().subscribe({
      next: (entries: VisitorEntry[]) => {
        this.approvalRequests = entries.filter(e => e.approvalRequested && !e.approvedByResident && !e.rejectedByResident);
      },
      error: err => {
        console.error('Failed to load approval requests', err);
      }
    });
  }

  openApprovalDialog(entry: VisitorEntry, approved: boolean = true): void {
    const dialogRef = this.dialog.open(ApprovalDialogComponent, {
      width: '400px',
      data: { ...entry, approved }
    });

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) this.fetchApprovalRequests();
    });
  }
}
