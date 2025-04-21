import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { DefaulterService } from '../core/services/defaulter.service';
import { DefaulterFormDialogComponent } from './defaulter-form-dialog.component';

@Component({
  selector: 'app-defaulters',
  standalone: true,
  templateUrl: './defaulters.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    DefaulterFormDialogComponent
  ]
})
export class DefaultersComponent implements OnInit {
  defaulters: any[] = [];
  displayedColumns: string[] = ['residentName', 'amount', 'actions'];
  societyId: string = JSON.parse(localStorage.getItem('user') || '{}')?.societyId;

  constructor(
    private service: DefaulterService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.service.getAll(this.societyId).subscribe({
      next: data => this.defaulters = data,
      error: () => this.snackBar.open('Failed to load defaulters', 'Close', { duration: 3000 })
    });
  }

  openDialog(defaulter: any = null): void {
    const dialogRef = this.dialog.open(DefaulterFormDialogComponent, {
      width: '400px',
      data: defaulter
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const call = defaulter
          ? this.service.update(defaulter.customId, result)
          : this.service.create({ ...result, societyId: this.societyId });

        call.subscribe({
          next: () => {
            this.snackBar.open(defaulter ? 'Updated' : 'Added', 'Close', { duration: 2000 });
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