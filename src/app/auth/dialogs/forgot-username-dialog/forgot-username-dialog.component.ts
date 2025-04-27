import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-username-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './forgot-username-dialog.component.html',
  styleUrls: ['./forgot-username-dialog.component.scss']
})
export class ForgotUsernameDialogComponent {
  forgotUsernameForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ForgotUsernameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.forgotUsernameForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      societyId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotUsernameForm.invalid) {
      this.forgotUsernameForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { email, societyId } = this.forgotUsernameForm.value;

    this.http.post(`${environment.loginApiUrl}/api/users/forgot-username`, null, {
      params: { email, societyId }
    }).subscribe({
      next: () => {
        alert('Username retrieval instructions sent! Check your email.');
        this.dialogRef.close(true);
      },
      error: (err) => {
        alert('Failed to retrieve username. Please check email/society.');
        console.error(err);
        this.submitting = false;
      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
