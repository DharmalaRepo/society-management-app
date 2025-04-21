import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Vehicle } from 'src/app/core/models/vehicle.model';
import { ResidentService } from 'src/app/core/services/resident.service';

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  templateUrl: './vehicle-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class VehicleDialogComponent {
  form: FormGroup;
  private dialogRef = inject(MatDialogRef<VehicleDialogComponent>);
  public data = inject(MAT_DIALOG_DATA);
  private service = inject(ResidentService);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      owner: [this.data?.owner ?? '', Validators.required],
      number: [this.data?.number ?? '', Validators.required],
      type: [this.data?.type ?? '', Validators.required],
    });
  }

  submit(): void {
    const payload = this.form.value as Vehicle;
    if (this.data?.id) {
      this.service.updateVehicle(this.data.id, payload).subscribe(() => this.dialogRef.close(true));
    } else {
      this.service.createVehicle(payload).subscribe(() => this.dialogRef.close(true));
    }
  }
}
