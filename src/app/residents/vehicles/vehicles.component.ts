import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Vehicle } from 'src/app/core/models/vehicle.model';
import { ResidentService } from 'src/app/core/services/resident.service';
import { VehicleDialogComponent } from './vehicle-dialog.component';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  templateUrl: './vehicles.component.html',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule]
})
export class VehiclesComponent {
  vehicles: Vehicle[] = [];
  private service = inject(ResidentService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.fetchVehicles();
  }

  fetchVehicles() {
    this.service.getVehicles().subscribe(data => this.vehicles = data);
  }

  openDialog(existingVehicle?: Vehicle) {
    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: existingVehicle || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existingVehicle
          ? this.service.updateVehicle(existingVehicle.id!, result).subscribe(() => this.fetchVehicles())
          : this.service.createVehicle(result).subscribe(() => this.fetchVehicles());
      }
    });
  }

  deleteVehicle(id: string) {
    this.service.deleteVehicle(id).subscribe(() => this.fetchVehicles());
  }
}
