import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';

import { ResidentService } from 'src/app/core/services/residents/resident.service';
import { AlertReminder } from 'src/app/core/models/resident/alert-reminder.model';
import { AlertDialogComponent } from './alert-dialog.component';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  standalone: true,
  imports: [CommonModule,
           ReactiveFormsModule,
           FormsModule,
           MatCardModule,
           MatFormFieldModule,
           MatInputModule,
           MatSelectModule,
           MatOptionModule,
           MatIconModule,
           MatDialogModule,
           MatButtonModule,
           MatListModule,
           MatDatepickerModule,
           MatNativeDateModule,
 	        MatNativeDateModule,
           MatSlideToggleModule,
  		      MatListModule,
 ],
})
export class AlertsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private residentService = inject(ResidentService);
  private snackBar = inject(MatSnackBar);

  alerts: AlertReminder[] = [];
  displayedColumns: string[] = ['title', 'message', 'triggerDate', 'deliveryMethods', 'actions'];

  ngOnInit(): void {
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.residentService.getUpcomingReminders().subscribe((res: AlertReminder[]) => {
      this.alerts = res;
    });
  }

  openDialog(existing?: AlertReminder): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '400px',
      data: existing || null,
    });

    dialogRef.afterClosed().subscribe((result: AlertReminder | undefined) => {
      if (result) {
        this.residentService.createAlertReminder(result).subscribe(() => {
          this.snackBar.open('Alert saved successfully', 'Close', { duration: 2000 });
          this.loadAlerts();
        });
      }
    });
  }

  deleteAlert(id: string): void {
    this.residentService.deleteAlertReminder(id).subscribe(() => this.loadAlerts());
  }

}
