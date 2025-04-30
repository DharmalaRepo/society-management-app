import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { VisitorAuthService } from 'src/app/core/services/visitor-auth/visitor-auth.service';
import { VisitorEntryRequest } from 'src/app/core/models/visitor-auth/visitor-entry-request.model';

@Component({
  selector: 'app-generate-otp',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './generate-otp.component.html',
  styleUrl: './generate-otp.component.scss'
})
export class GenerateOtpComponent {
  private fb = inject(FormBuilder);
  private service = inject(VisitorAuthService);
  private snackBar = inject(MatSnackBar);

  form: FormGroup = this.fb.group({
    visitorName: ['', Validators.required],
    visitorMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    blockNumber: ['', Validators.required],
    flatNumber: ['', Validators.required],
    purpose: ['', Validators.required],
    visitorEmail: [''],
    vehicleNumber: [''],
    photoUrl: [''] // Optional image URL
  });

  otpResult: string | null = null;
  loading = false;

  generateOtp(): void {
    if (this.form.invalid) return;

    const payload: VisitorEntryRequest = {
      visitorName: this.form.value.visitorName,
      visitorMobile: this.form.value.visitorMobile,
      blockNumber: this.form.value.blockNumber,
      flatNumber: this.form.value.flatNumber,
      purpose: this.form.value.purpose,
      flatId: this.form.value.flatId,
      visitorEmail: this.form.value.visitorEmail,
      vehicleNumber: this.form.value.vehicleNumber,
      photoUrl: this.form.value.photoUrl,
      societyIdentifier: '', // ← Fill from context/header
      createdBy: '',         // ← Fill from auth
      createdByRole: ''      // ← Fill from auth
    };

    this.loading = true;
    this.service.generateOtp(payload).subscribe({
      next: (otp) => {
        this.otpResult = otp;
        this.snackBar.open('OTP generated successfully!', 'Close', { duration: 3000 });
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Failed to generate OTP', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }
}
