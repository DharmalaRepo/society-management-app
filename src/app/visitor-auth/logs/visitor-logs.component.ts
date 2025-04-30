import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorAuthService } from 'src/app/core/services/visitor-auth/visitor-auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VisitorEntry } from 'src/app/core/models/visitor-auth/visitor-entry.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { inject } from '@angular/core';

@Component({
  selector: 'app-visitor-logs',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './visitor-logs.component.html',
  styleUrls: ['./visitor-logs.component.scss']
})
export class VisitorLogsComponent implements OnInit {
  private service = inject(VisitorAuthService);
  private snackBar = inject(MatSnackBar);

  visitorLogs: VisitorEntry[] = [];
  displayedColumns: string[] = [
    'visitorName',
    'flatNumber',
    'purpose',
    'entryGate',
    'otp',
    'approvalStatus',
    'checkInTime',
    'checkOutTime',
    'actions'
  ];

  ngOnInit(): void {
    this.fetchLogs();
  }

  fetchLogs(): void {
    this.service.getTodayVisitors().subscribe({
      next: (res: VisitorEntry[]) => {
        this.visitorLogs = res;
      },
      error: (err) => {
        console.error('Error loading visitor logs:', err);
      }
    });
  }

  resendOtp(entryId: string): void {
    this.service.resendOtp(entryId).subscribe({
      next: (success) => {
        this.snackBar.open('OTP resent successfully.', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to resend OTP.', 'Close', { duration: 3000 });
      }
    });
  }

  cancelOtp(entryId: string): void {
    this.service.cancelOtp(entryId).subscribe({
      next: (success) => {
        this.snackBar.open('OTP cancelled successfully.', 'Close', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open('Failed to cancel OTP.', 'Close', { duration: 3000 });
      }
    });
  }

  getApprovalStatus(entry: VisitorEntry): string {
    if (entry.approvalRequested) {
      if (entry.approvedByResident) return 'Approved';
      if (entry.rejectedByResident) return 'Rejected';
      return 'Pending';
    }
    return 'Not Requested';
  }
}
