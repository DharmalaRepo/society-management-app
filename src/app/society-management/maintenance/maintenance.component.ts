import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { SocietyService } from 'src/app/core/services/society.service';
import { MaintenanceDialogComponent } from '../dialogs/maintenance-dialog/maintenance-dialog.component';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  templateUrl: './maintenance.component.html',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule]
})
export class MaintenanceComponent {
  private societyService = inject(SocietyService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['frequency', 'amount', 'dueDate', 'lateFee', 'actions'];
  dataSource: any[] = [];

  constructor() {
    this.loadData();
  }

  loadData() {
    this.societyService.getMaintenance().subscribe({
      next: (settings) => this.dataSource = settings || [],
      error: () => this.snackBar.open('Failed to load maintenance settings', 'Close', { duration: 3000 })
    });
  }

  openDialog(setting?: any) {
    const dialogRef = this.dialog.open(MaintenanceDialogComponent, {
      width: '400px',
      data: setting
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  delete(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.societyService.deleteMaintenance(id).subscribe({
        next: () => {
          this.snackBar.open('Deleted successfully!', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: () => this.snackBar.open('Delete failed.', 'Close', { duration: 3000 })
      });
    }
  }
}
