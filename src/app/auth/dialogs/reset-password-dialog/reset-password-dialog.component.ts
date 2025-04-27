import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ],
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss']
})
export class ResetPasswordDialogComponent {
  resetForm: FormGroup;
  submitting = false;
  resetType: 'token' | 'old' = 'old'; // Default is token reset

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.resetForm = this.fb.group({
      username: [''],
      societyId: ['', Validators.required],
      token: [''],
      oldPassword: [''],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { username, societyId, token, oldPassword, newPassword } = this.resetForm.value;

    if (this.resetType === 'token') {
      if (!token || !newPassword || !societyId) {
        this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
        this.submitting = false;
        return;
      }

      this.http.post(`${environment.loginApiUrl}/api/users/reset-password-token`, null, {
        params: { token, newPassword, societyId }
      }).subscribe({
        next: () => {
          this.snackBar.open('Password Reset Successful (using Token)!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Password Reset Failed (Token).', 'Close', { duration: 3000 });
          console.error(err);
          this.submitting = false;
        }
      });

    } else {
      if (!username || !oldPassword || !newPassword || !societyId) {
        this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
        this.submitting = false;
        return;
      }

      this.http.post(`${environment.loginApiUrl}/api/users/reset-password-old`, null, {
        params: { username, oldPassword, newPassword, societyId }
      }).subscribe({
        next: () => {
          this.snackBar.open('Password Reset Successful (using Old Password)!', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Password Reset Failed (Old Password).', 'Close', { duration: 3000 });
          console.error(err);
          this.submitting = false;
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
