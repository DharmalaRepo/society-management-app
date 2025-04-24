
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocietyParking } from '../../core/models/society-parking.model';
import { SocietyService } from '../../core/services/society.service';
import { ParkingDialogComponent } from '../dialogs/parking-dialog/parking-dialog.component';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent implements OnInit {
  private service = inject(SocietyService);
  private dialog = inject(MatDialog);
  data: SocietyParking[] = [];
  displayedColumns: string[] = ['customId', 'type', 'actions'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getParkings().subscribe(res => this.data = res);
  }

  openDialog(existing?: SocietyParking) {
    const dialogRef = this.dialog.open(ParkingDialogComponent, {
      width: '400px',
      data: existing || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existing
          ? this.service.updateParking(existing.id!, result).subscribe(() => this.fetchData())
          : this.service.createParking(result).subscribe(() => this.fetchData());
      }
    });
  }

  delete(id: string) {
    this.service.deleteParking(id).subscribe(() => this.fetchData());
  }
}
