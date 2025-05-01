import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';

import { ResidentService } from 'src/app/core/services/residents/resident.service';
import { VehicleDialogComponent } from './vehicle-dialog.component';
import { Vehicle } from 'src/app/core/models/resident/vehicle.model';



@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            MatTableModule,
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
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  displayedColumns: string[] = ['vehicleNumber', 'vehicleType', 'brand', 'color', 'parkingSlot', 'actions'];

  constructor(private service: ResidentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.service.getAllVehicles().subscribe((res: any) => {
      this.vehicles = res;
    });
  }

  openDialog(vehicle?: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '400px',
      data: vehicle || null
    });

    dialogRef.afterClosed().subscribe((result: Vehicle) => {
      if (result) {
        const saveFn = result.vehicleId ? this.service.updateVehicle.bind(this.service) : this.service.createVehicle.bind(this.service);
        saveFn(result).subscribe(() => this.loadVehicles());
      }
    });
  }

  deleteVehicle(vehicleId: string): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.service.deleteVehicle(vehicleId).subscribe(() => this.loadVehicles());
    }
  }
}
