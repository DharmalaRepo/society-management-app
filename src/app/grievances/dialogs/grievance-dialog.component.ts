import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Grievance } from 'src/app/core/models/grievances/grievance.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grievance-dialog',
  standalone: true,
  templateUrl: './grievance-dialog.component.html',
  styleUrls: ['./grievance-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class GrievanceDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GrievanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grievance | null
  ) {
    this.form = this.fb.group({
      grievanceDescription: [data?.grievanceDescription || '', Validators.required],
      category: [data?.category || '', Validators.required],
      severity: [data?.severity || '', Validators.required],
      status: [data?.status || '', Validators.required],
      assignedTo: [data?.assignedTo || '', Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
