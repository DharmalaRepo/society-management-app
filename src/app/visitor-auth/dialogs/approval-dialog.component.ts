import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitorAuthService } from '../../core/services/visitor-auth/visitor-auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { VisitorEntry } from '../../core/models/visitor-auth/visitor-entry.model';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-approval-dialog',
  standalone: true,
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class ApprovalDialogComponent {
  form: FormGroup;
  private fb = inject(FormBuilder);
  private visitorService = inject(VisitorAuthService);
  private snackBar = inject(MatSnackBar);

  constructor(
    private dialogRef: MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VisitorEntry
  ) {
    this.form = this.fb.group({
      note: ['', [Validators.required, Validators.maxLength(250)]]
    });
  }

  approve() {
    this.respond(true);
  }

  reject() {
    this.respond(false);
  }

  private respond(approved: boolean) {
    if (this.form.invalid) return;

    this.visitorService.respondToApproval({
      entryId: this.data.id ?? '',
      approved,
      note: this.form.value.note
    }).subscribe({
      next: () => {
        this.snackBar.open(`Request ${approved ? 'approved' : 'rejected'}`, 'Close', { duration: 3000 });
        this.dialogRef.close({ action: approved ? 'approved' : 'rejected' });
      },
      error: () => {
        this.snackBar.open('Failed to respond to approval request', 'Close', { duration: 3000 });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
