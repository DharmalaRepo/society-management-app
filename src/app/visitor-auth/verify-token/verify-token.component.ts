import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitorService } from 'src/app/core/services/visitor.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { VisitorToken } from 'src/app/core/models/visitortoken.model';

@Component({
  selector: 'app-verify-token',
  standalone: true,
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class VerifyTokenComponent {
  form: FormGroup;
  tokenDetails: VisitorToken | null = null;

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService
  ) {
    this.form = this.fb.group({
      tokenId: ['', Validators.required]
    });
  }

  onVerify(): void {
    const tokenId = this.form.value.tokenId;
    if (!tokenId) return;

    this.visitorService.verifyToken(tokenId).subscribe({
      next: (result: { valid: boolean; token?: VisitorToken }) => {
        if (result.valid && result.token) {
          this.tokenDetails = result.token;
        } else {
          this.tokenDetails = null;
          alert('Invalid Token');
        }
      },
      error: () => {
        alert('Error verifying token');
      }
    });
  }
}
