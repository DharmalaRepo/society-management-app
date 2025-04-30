import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../auth/dialogs/forgot-password-dialog/forgot-password-dialog.component';
import { environment } from 'src/environments/environment';
import { ResetPasswordDialogComponent } from '../auth/dialogs/reset-password-dialog/reset-password-dialog.component';
import { ForgotUsernameDialogComponent } from '../auth/dialogs/forgot-username-dialog/forgot-username-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  loginForm: FormGroup;
  submitting = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      societyId: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const form = this.loginForm.value;
    this.submitting = true;

    this.http.post(`${environment.loginApiUrl}/api/users/login`, {
      username: form.username,
      password: form.password,
      societyId: form.societyId
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' as 'json'
    })
    .subscribe({
      next: (response: any) => {
        console.log('Login Success', response);

        // 🔥 Proper session save
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('username', form.username);
        sessionStorage.setItem('societyIdentifier', form.societyId);

        this.snackBar.open('Login Successful!', 'Close', { duration: 3000 });
        this.router.navigate(['master']);
      },
      error: (error) => {
        console.error('Login Failed', error);
        this.snackBar.open('Login Failed! Please check credentials.', 'Close', { duration: 3000 });
        this.submitting = false;
      }
    });
  }

  // function
  onForgotPassword() {
    this.dialog.open(ForgotPasswordDialogComponent, {
      width: '400px'
    });
  }

  onResetPassword() {
    this.dialog.open(ResetPasswordDialogComponent, {
      width: '400px'
    });
  }

  onForgotUsername() {
    this.dialog.open(ForgotUsernameDialogComponent, {
      width: '400px'
    });
  }
}
