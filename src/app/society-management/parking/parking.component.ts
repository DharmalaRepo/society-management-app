import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SocietyService } from 'src/app/core/services/society.service';
import { SocietyParking } from 'src/app/core/models/society-registration/society-details.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ParkingDialogComponent } from '../dialogs/parking-dialog/parking-dialog.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { MatTooltipModule } from '@angular/material/tooltip'; // Optional (for button tooltips)

@Component({
  selector: 'app-parking',
  standalone: true,
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatTooltipModule, // optional
    ParkingDialogComponent
  ]
})
export class ParkingComponent implements OnInit {
  dataSource = new Array<SocietyParking>();
  displayedColumns: string[] = ['slotNumber', 'slotType', 'floor', 'isOccupied', 'actions'];

  constructor(
    private societyService: SocietyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadParkingSlots();
  }

  loadParkingSlots(): void {
    this.societyService.getParkingSlots().subscribe({
      next: (data) => this.dataSource = data || [],
      error: (err) => console.error('Failed to fetch parking slots', err)
    });
  }

  openDialog(parkingSlot?: SocietyParking): void {
    const dialogRef = this.dialog.open(ParkingDialogComponent, {
      width: '400px',
      data: parkingSlot || null,
    });

    dialogRef.afterClosed().subscribe((result: SocietyParking | undefined) => {
      if (result) {
        if (result.id) {
          this.societyService.updateParkingSlot(result.id, result).subscribe(() => this.loadParkingSlots());
        } else {
          this.societyService.createParkingSlot(result).subscribe(() => this.loadParkingSlots());
        }
      }
    });
  }

  deleteParkingSlot(id: string): void {
    if (confirm('Are you sure you want to delete this parking slot?')) {
      this.societyService.deleteParkingSlot(id).subscribe(() => this.loadParkingSlots());
    }
  }
}
