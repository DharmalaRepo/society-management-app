
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { VehicleDialogComponent } from './vehicle-dialog.component';
import { ResidentService } from 'src/app/core/services/resident.service';
import { Vehicle } from 'src/app/core/models/vehicle.model';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [];
  displayedColumns = ['flatNumber', 'vehicleNumber', 'vehicleType', 'brand', 'color', 'residentId', 'dates', 'actions'];
  dataSource = new MatTableDataSource<Vehicle>();
  filterValue: string = '';

  private dialog = inject(MatDialog);
  private service = inject(ResidentService);

  constructor() {
    this.fetchVehicles();
  }

  fetchVehicles() {
    this.service.getVehicles().subscribe(data => {
      this.vehicles = data;
      this.dataSource.data = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(vehicle?: Vehicle): void {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      width: '500px',
      data: vehicle || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const operation = vehicle?.id
          ? this.service.updateVehicle(vehicle.id, result)
          : this.service.createVehicle(result);
        operation.subscribe(() => this.fetchVehicles());
      }
    });
  }

  deleteVehicle(id: string) {
    this.service.deleteVehicle(id).subscribe(() => this.fetchVehicles());
  }
}
