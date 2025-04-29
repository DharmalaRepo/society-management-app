import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SocietyParking } from 'src/app/core/models/society-registration/society-details.model';

@Component({
  selector: 'app-parking-dialog',
  standalone: true,
  templateUrl: './parking-dialog.component.html',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule]
})
export class ParkingDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ParkingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SocietyParking
  ) {
    this.form = this.fb.group({
      id: [data?.id || null],
      spotNumber: [data?.spotNumber || '', Validators.required],
      type: [data?.type || '', Validators.required],
      allocatedToFlatNumber: [data?.allocatedToFlatNumber || ''],
      occupied: [!!data?.occupied]
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
