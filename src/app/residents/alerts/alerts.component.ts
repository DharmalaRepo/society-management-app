import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ResidentService } from 'src/app/core/services/resident.service';
import { Alert } from 'src/app/core/models/alert.model';
import { AlertDialogComponent } from './alert-dialog.component';

@Component({
  selector: 'app-alerts',
  standalone: true,
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ]
})
export class AlertsComponent implements OnInit {
  alerts: Alert[] = [];
  private service = inject(ResidentService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.fetchAlerts();
  }

  fetchAlerts(): void {
    this.service.getAlerts().subscribe((data: Alert[]) => this.alerts = data);
  }

  openDialog(existingAlert?: Alert): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: existingAlert,
    });

    dialogRef.afterClosed().subscribe((result: Alert) => {
      if (result) {
        existingAlert?.id
          ? this.service.updateAlert(existingAlert.id, result).subscribe(() => this.fetchAlerts())
          : this.service.createAlert(result).subscribe(() => this.fetchAlerts());
      }
    });
  }

  deleteAlert(id: string): void {
    this.service.deleteAlert(id).subscribe(() => this.fetchAlerts());
  }
}
