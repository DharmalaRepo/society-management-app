import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GrievanceService } from 'src/app/core/services/grievance.service';
import { GrievanceFormDialogComponent } from './grievance-form-dialog.component';

@Component({
  selector: 'app-grievances-all',
  standalone: true,
  template: '<p>Grievance list coming soon...</p>',
  imports: []
})
export class AllGrievancesComponent implements OnInit {
  grievances: any[] = [];

  constructor(
    private grievanceService: GrievanceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGrievances();
  }

  loadGrievances(): void {
    this.grievanceService.getAll().subscribe(data => {
      this.grievances = data;
    });
  }

  openDialog(data: any = null): void {
    const dialogRef = this.dialog.open(GrievanceFormDialogComponent, {
      data,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (data) {
          this.grievanceService.update(data.id, result).subscribe(() => this.loadGrievances());
        } else {
          this.grievanceService.create(result).subscribe(() => this.loadGrievances());
        }
      }
    });
  }

  delete(id: string): void {
    this.grievanceService.delete(id).subscribe(() => this.loadGrievances());
  }
}