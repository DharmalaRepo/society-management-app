import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SocietyFlat } from 'src/app/core/models/society-registration/society-details.model';
import { SocietyService } from 'src/app/core/services/society.service';
import { FlatDialogComponent } from '../dialogs/flat-dialog/flat-dialog.component'; // ✅ Corrected path
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-flats',
  standalone: true,
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
  ]
})
export class FlatsComponent implements OnInit {
  displayedColumns: string[] = ['blockName', 'floor', 'flatNumber', 'type', 'areaInSqFt', 'occupied', 'actions'];
  dataSource = new MatTableDataSource<SocietyFlat>();

  constructor(
    private societyService: SocietyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFlats();
  }

  loadFlats() {
    this.societyService.getFlats().subscribe({
      next: (flats: SocietyFlat[]) => {  // ✅ Added type
        this.dataSource.data = flats || [];
      },
      error: (err: any) => {             // ✅ Added type
        console.error('Failed to load flats:', err);
      }
    });
  }

  addFlat() {
    const dialogRef = this.dialog.open(FlatDialogComponent, {
      width: '400px',
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFlats();
      }
    });
  }

  editFlat(flat: SocietyFlat) {
    const dialogRef = this.dialog.open(FlatDialogComponent, {
      width: '400px',
      data: flat,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFlats();
      }
    });
  }

  deleteFlat(flat: SocietyFlat) {
    if (flat.id) {
      this.societyService.deleteFlat(flat.id).subscribe(() => {
        this.loadFlats();
      });
    }
  }
}
