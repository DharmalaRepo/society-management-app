import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SocietyAmenity } from 'src/app/core/models/society-registration/society-details.model';

@Component({
  selector: 'app-amenity-dialog',
  standalone: true,
  templateUrl: './amenity-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class AmenityDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AmenityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SocietyAmenity
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      name: [data?.name || '', Validators.required],
      location: [data?.location || ''],
      description: [data?.description || ''],
      isActive: [!!data?.isActive] // Convert number to boolean
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
