import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Resident } from 'src/app/core/models/resident/resident.model';
import { ResidentFormDialogComponent } from './resident-form-dialog.component';
import { ResidentService } from 'src/app/core/services/resident.service';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss'],
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatDialogModule, ResidentFormDialogComponent]
})
export class ResidentsComponent {
  residents: Resident[] = [];

  constructor(private dialog: MatDialog, private service: ResidentService) {
    this.fetchResidents();
  }

  fetchResidents() {
    this.service.getResidents().subscribe(data => (this.residents = data));
  }

  openDialog(resident?: Resident) {
    const dialogRef = this.dialog.open(ResidentFormDialogComponent, {
      width: '400px',
      data: resident || null,
    });

    dialogRef.afterClosed().subscribe((result: Resident) => {
      if (!result) return;

      const request$ = resident?.id
        ? this.service.updateResident(resident.id, result)
        : this.service.createResident(result);

      request$.subscribe(() => this.fetchResidents());
    });
  }

  deleteResident(id: string) {
    this.service.deleteResident(id).subscribe(() => this.fetchResidents());
  }
}
