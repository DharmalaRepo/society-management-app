import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VisitorAuthService } from 'src/app/core/services/visitor-auth/visitor-auth.service';
import { VisitorEntryRequest } from 'src/app/core/models/visitor-auth/visitor-entry-request.model';

@Component({
  selector: 'app-request-approval',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './request-approval.component.html'
})
export class RequestApprovalComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorAuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const societyIdentifier = sessionStorage.getItem('societyIdentifier') || '';
    const createdBy = sessionStorage.getItem('username') || '';

    this.form = this.fb.group({
      visitorName: ['', Validators.required],
      visitorMobile: ['', Validators.required],
      flatNumber: ['', Validators.required],
      blockNumber: [''],
      purpose: ['', Validators.required],
      societyIdentifier: [societyIdentifier],
      createdBy: [createdBy],
      createdByRole: ['SECURITY'],
      approvalRequested: [true],
      approvedByResident: [false],
      rejectedByResident: [false],
      approvalStatus: ['PENDING']
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload: VisitorEntryRequest = this.form.value;
    this.loading = true;

    this.visitorService.requestApproval(payload).subscribe({
      next: (success) => {
        this.loading = false;
        if (success) {
          this.snackBar.open('Approval request sent.', 'Close', { duration: 3000 });
          this.form.reset();
        } else {
          this.snackBar.open('Failed to send request.', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        this.snackBar.open('Error sending request.', 'Close', { duration: 3000 });
      }
    });
  }
}
