import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Vehicle } from 'src/app/core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class VehicleDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      vehicleNumber: [this.data?.vehicleNumber || '', Validators.required],
      vehicleType: [this.data?.vehicleType || '', Validators.required],
      brand: [this.data?.brand || '', Validators.required],
      color: [this.data?.color || '', Validators.required],
      flatNumber: [this.data?.flatNumber || '', Validators.required]
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
