import { Component, OnInit, inject } from '@angular/core';
import { Grievance } from '../core//models/grievances/grievance.model';
import { GrievanceService } from 'src/app/core/services/grievance.service';
import { MatDialog } from '@angular/material/dialog';
import { GrievanceDialogComponent } from './dialogs/grievance-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grievances',
  standalone: true,
  templateUrl: './grievances.component.html',
  styleUrls: ['./grievances.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
})
export class GrievancesComponent implements OnInit {
  grievances: Grievance[] = [];
  displayedColumns: string[] = ['customId', 'description', 'category', 'severity', 'status', 'assignedTo', 'actions'];
  filter: string = '';

  private service = inject(GrievanceService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.fetchGrievances();
  }

  fetchGrievances(): void {
    this.service.getGrievancesByStatus('1', 'Open').subscribe((data) => {
      this.grievances = data;
    });
  }

  openDialog(existing?: Grievance): void {
    const dialogRef = this.dialog.open(GrievanceDialogComponent, {
      data: existing || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        existing
          ? this.service.updateGrievanceStatus(existing.id!, result.status, result.assignedTo).subscribe(() => this.fetchGrievances())
          : this.service.logGrievance(result).subscribe(() => this.fetchGrievances());
      }
    });
  }

  applyFilter(): Grievance[] {
    const term = this.filter.trim().toLowerCase();
    return this.grievances.filter(gr =>
      gr.grievanceDescription?.toLowerCase().includes(term) ||
      gr.category?.toLowerCase().includes(term) ||
      gr.status?.toLowerCase().includes(term)
    );
  }
}
