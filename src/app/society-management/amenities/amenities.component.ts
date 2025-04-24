
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocietyAmenity } from '../../core/models/society-amenity.model';
import { SocietyService } from '../../core/services/society.service';
import { AmenityDialogComponent } from '../dialogs/amenity-dialog/amenity-dialog.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, AmenityDialogComponent],
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {
  private service = inject(SocietyService);
  private dialog = inject(MatDialog);
  data: SocietyAmenity[] = [];
  displayedColumns: string[] = ['customId', 'type', 'actions'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getAmenities().subscribe(res => this.data = res);
  }

  openDialog(existing?: SocietyAmenity) {
    const dialogRef = this.dialog.open(AmenityDialogComponent, {
      width: '400px',
      data: existing || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existing
          ? this.service.updateAmenity(existing.id!, result).subscribe(() => this.fetchData())
          : this.service.createAmenity(result).subscribe(() => this.fetchData());
      }
    });
  }

  delete(id: string) {
    this.service.deleteAmenity(id).subscribe(() => this.fetchData());
  }
}
