import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FestiveVolunteer } from '../../core/models/events/festive-volunteer.model';

@Component({
  selector: 'app-festive-volunteer-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './festive-volunteer-dialog.component.html',
  styleUrls: ['./festive-volunteer-dialog.component.scss']
})
export class FestiveVolunteerDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FestiveVolunteerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FestiveVolunteer,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      customId: [data.customId || ''],
      active: [data.active || false]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }
}
