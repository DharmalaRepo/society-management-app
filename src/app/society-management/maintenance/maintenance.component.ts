
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocietyMaintenanceSetting } from '../../core/models/society-maintenance-setting.model';
import { SocietyService } from '../../core/services/society.service';
import { MaintenanceDialogComponent } from '../dialogs/maintenance-dialog/maintenance-dialog.component';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  private service = inject(SocietyService);
  private dialog = inject(MatDialog);
  data: SocietyMaintenanceSetting[] = [];
  displayedColumns: string[] = ['customId', 'type', 'actions'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getMaintenance().subscribe(res => this.data = res);
  }

  openDialog(existing?: SocietyMaintenanceSetting) {
    const dialogRef = this.dialog.open(MaintenanceDialogComponent, {
      width: '400px',
      data: existing || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existing
          ? this.service.updateMaintenance(existing.id!, result).subscribe(() => this.fetchData())
          : this.service.createMaintenance(result).subscribe(() => this.fetchData());
      }
    });
  }

  delete(id: string) {
    this.service.deleteMaintenance(id).subscribe(() => this.fetchData());
  }
}
