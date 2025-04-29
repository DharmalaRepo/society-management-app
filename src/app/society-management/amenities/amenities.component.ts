import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SocietyService } from 'src/app/core/services/society.service';
import { SocietyAmenity } from 'src/app/core/models/society-registration/society-details.model';
import { AmenityDialogComponent } from '../dialogs/amenity-dialog/amenity-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-amenities',
  standalone: true,
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule // ✅ use MatTableModule instead of MatTableDataSource
  ]
})
export class AmenitiesComponent {
  societyService = inject(SocietyService);
  dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<SocietyAmenity>([]);
  displayedColumns: string[] = ['name', 'location', 'description', 'isActive', 'actions'];

  constructor() {
    this.loadAmenities();
  }

  loadAmenities() {
    this.societyService.getAmenities().subscribe({
      next: (data: SocietyAmenity[]) => {
        this.dataSource.data = data || [];
      },
      error: (err) => {
        console.error('Failed to fetch amenities', err);
      }
    });
  }

  openDialog(amenity?: SocietyAmenity) {
    const dialogRef = this.dialog.open(AmenityDialogComponent, {
      width: '400px',
      data: amenity
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (amenity?.id) {
          this.societyService.updateAmenity(amenity.id, result).subscribe(() => this.loadAmenities());
        } else {
          this.societyService.createAmenity(result).subscribe(() => this.loadAmenities());
        }
      }
    });
  }

  deleteAmenity(id: string) {
    if (confirm('Are you sure you want to delete this amenity?')) {
      this.societyService.deleteAmenity(id).subscribe(() => this.loadAmenities());
    }
  }
}
