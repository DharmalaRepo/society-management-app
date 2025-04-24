import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Resident } from 'src/app/core/models/resident.model';

@Component({
  selector: 'app-resident-form-dialog',
  templateUrl: './resident-form-dialog.component.html',
  styleUrls: ['./resident-form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ResidentFormDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ResidentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Resident | null,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      flatNumber: [this.data?.flatNumber || '', Validators.required],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.mobileNumber || '', Validators.required],
      apartment: [this.data?.flatNumber || '', Validators.required]  // Add this line
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
