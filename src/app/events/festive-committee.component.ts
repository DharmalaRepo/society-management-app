import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FestiveCommittee } from 'src/app/core/models/events/festive-committee.model';
import { FestiveCommitteeService } from 'src/app/core/services/events/festive-committee.service';
import { FestiveCommitteeDialogComponent } from './dialogs/festive-committee-dialog.component';

@Component({
  selector: 'app-festive-committee',
  standalone: true,
  templateUrl: './festive-committee.component.html',
  styleUrls: ['./festive-committee.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class FestiveCommitteeComponent {
  private service = inject(FestiveCommitteeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['occasionName', 'occasionDate', 'status', 'actions'];
  committees: FestiveCommittee[] = [];

  ngOnInit() {
    this.loadCommittees();
  }

  loadCommittees() {
    this.service.getAll().subscribe({
      next: (data) => (this.committees = data),
      error: () => this.snackBar.open('Error loading committees', 'Close', { duration: 3000 })
    });
  }

  openDialog(committee?: FestiveCommittee) {
    const dialogRef = this.dialog.open(FestiveCommitteeDialogComponent, {
      width: '400px',
      data: committee || null
    });

    dialogRef.afterClosed().subscribe((result: FestiveCommittee | undefined) => {
      if (result) {
        committee ? this.updateCommittee(result) : this.createCommittee(result);
      }
    });
  }

  createCommittee(data: FestiveCommittee) {
    this.service.create(data).subscribe({
      next: () => {
        this.snackBar.open('Committee created', 'Close', { duration: 3000 });
        this.loadCommittees();
      },
      error: () => this.snackBar.open('Creation failed', 'Close', { duration: 3000 })
    });
  }

  updateCommittee(data: FestiveCommittee) {
    if (!data.id) return;
    this.service.update(data.id, data).subscribe({
      next: () => {
        this.snackBar.open('Committee updated', 'Close', { duration: 3000 });
        this.loadCommittees();
      },
      error: () => this.snackBar.open('Update failed', 'Close', { duration: 3000 })
    });
  }

  deleteCommittee(id: string) {
    this.service.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Committee deleted', 'Close', { duration: 3000 });
        this.loadCommittees();
      },
      error: () => this.snackBar.open('Delete failed', 'Close', { duration: 3000 })
    });
  }
}
