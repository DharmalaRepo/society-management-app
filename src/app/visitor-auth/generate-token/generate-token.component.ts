import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { VisitorService } from 'src/app/core/services/visitor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitorToken } from 'src/app/core/models/visitortoken.model';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class GenerateTokenComponent {
  form: FormGroup;
  editingId: string | null = null;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      visitorName: ['', Validators.required],
      purpose: ['', Validators.required],
      validTill: ['', Validators.required],
      contact: ['', Validators.required]
    });

    this.route.queryParamMap.subscribe(params => {
      this.editingId = params.get('id');
      if (this.editingId) {
        this.isEditing = true;
        this.visitorService.getTokenById(this.editingId).subscribe((token: VisitorToken) => {
          this.form.patchValue(token);
        });
      }
    });
  }

  onSubmit(): void {
    const token: VisitorToken = {
      visitorName: this.form.value.visitorName ?? '',
      purpose: this.form.value.purpose ?? '',
      validTill: this.form.value.validTill ?? '',
      contact: this.form.value.contact ?? ''
    };

    if (this.isEditing && this.editingId) {
      this.visitorService.updateToken(this.editingId, token).subscribe(() => {
        this.router.navigate(['/visitor-auth/token-list']);
      });
    } else {
      this.visitorService.createToken(token).subscribe(() => {
        this.router.navigate(['/visitor-auth/token-list']);
      });
    }
  }
}
