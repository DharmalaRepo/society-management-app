import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';

import { Vehicle } from 'src/app/core/models/resident/vehicle.model';
import { SocietyConfigService } from 'src/app/core/services/society-config.service';
import { ResidentService } from 'src/app/core/services/residents/resident.service';



@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  standalone: true,
 imports: [CommonModule,
           ReactiveFormsModule,
           FormsModule,
           MatCardModule,
           MatFormFieldModule,
           MatInputModule,
           MatSelectModule,
           MatOptionModule,
           MatIconModule,
           MatDialogModule,
           MatButtonModule,
           MatListModule,
           MatDatepickerModule,
           MatNativeDateModule,
 	        MatNativeDateModule,
           MatSlideToggleModule,
  		      MatListModule,
 ],
})
export class VehicleDialogComponent implements OnInit {
  form!: FormGroup;
  flatNumbers: string[] = [];
  parkingSlots: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle | null,
    private configService: SocietyConfigService
  ) {    }

  ngOnInit(): void {
    this.flatNumbers = this.configService.getFlatBlockFloorLabels();
    this.parkingSlots = this.configService.getParkingSpots().map(p => p.spotNumber);

    this.form = this.fb.group({
      vehicleNumber: [this.data?.vehicleNumber || '', Validators.required],
      vehicleType: [this.data?.vehicleType || '', Validators.required],
      brand: [this.data?.brand || '', Validators.required],
      color: [this.data?.color || '', Validators.required],
      parkingSlot: [this.data?.parkingSlot || '', Validators.required],
      flatNumber: [this.data?.flatNumber || '', Validators.required]
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
