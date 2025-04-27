import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent {
  forgotForm: FormGroup;
  submitting = false;
  isTokenStage = false; // controls phase 1 or 2

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.forgotForm = this.fb.group({
      username: ['', Validators.required],
      societyId: ['', Validators.required],
      token: [''],
      newPassword: ['']
    });
  }

  onSubmit() {
    if (this.isTokenStage) {
      this.resetPassword();
    } else {
      this.generateToken();
    }
  }

  generateToken() {
    if (this.forgotForm.get('username')?.invalid || this.forgotForm.get('societyId')?.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { username, societyId } = this.forgotForm.value;

    this.http.post(`${environment.loginApiUrl}/api/users/forgot-password`, null, {
      params: { username, societyId }
    }).subscribe({
      next: () => {
        this.snackBar.open('Reset token generated successfully! Check your email or phone.', 'Close', { duration: 3000 });
        this.isTokenStage = true; // Move to token stage
        this.submitting = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to generate reset token.', 'Close', { duration: 3000 });
        console.error(err);
        this.submitting = false;
      }
    });
  }

  resetPassword() {
    if (this.forgotForm.get('token')?.invalid || this.forgotForm.get('newPassword')?.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { username, token, newPassword, societyId } = this.forgotForm.value;

    this.http.post(`${environment.loginApiUrl}/api/users/reset-password-token`, null, {
      params: { username, token, newPassword, societyId }
    }).subscribe({
      next: () => {
        this.snackBar.open('Password Reset Successful!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.snackBar.open('Password Reset Failed.', 'Close', { duration: 3000 });
        console.error(err);
        this.submitting = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
