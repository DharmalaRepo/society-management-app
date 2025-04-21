import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { GrievanceService } from '../core/services/grievance.service';
import { GrievanceFormDialogComponent } from './grievance-form-dialog.component';

@Component({
  selector: 'app-grievances',
  standalone: true,
  templateUrl: './grievances.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    GrievanceFormDialogComponent
  ]
})
export class GrievancesComponent implements OnInit {
  grievances: any[] = [];
  filteredGrievances: any[] = [];
  selectedStatus: string = '';
  displayedColumns: string[] = ['title', 'description', 'status', 'actions'];
  societyId: string = JSON.parse(localStorage.getItem('user') || '{}')?.societyId;

  constructor(
    private service: GrievanceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll(this.societyId).subscribe({
      next: data => {
        this.grievances = data;
        this.applyFilter();
      },
      error: () => this.snackBar.open('Failed to load grievances', 'Close', { duration: 3000 })
    });
  }

  applyFilter(): void {
    this.filteredGrievances = this.selectedStatus
      ? this.grievances.filter(g => g.status === this.selectedStatus)
      : this.grievances;
  }

  openDialog(grievance: any = null): void {
    const dialogRef = this.dialog.open(GrievanceFormDialogComponent, {
      width: '400px',
      data: grievance
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const action = grievance
          ? this.service.update(grievance.customId, result)
          : this.service.create({ ...result, societyId: this.societyId });

        action.subscribe({
          next: () => {
            this.snackBar.open(grievance ? 'Updated' : 'Submitted', 'Close', { duration: 2000 });
            this.fetch();
          }
        });
      }
    });
  }

  delete(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Deleted', 'Close', { duration: 2000 });
        this.fetch();
      }
    });
  }
}
