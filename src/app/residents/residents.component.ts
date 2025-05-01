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

import { Resident } from 'src/app/core/models/resident/resident.model';
import { ResidentService } from 'src/app/core/services/residents/resident.service';
import { ResidentFormDialogComponent } from './resident-form-dialog.component';
import { ConfirmStatusDialogComponent } from './dialogs/confirm-status-dialog.component';



@Component({
  selector: 'app-residents',
  standalone: true,
imports: [CommonModule,
          ReactiveFormsModule,
          FormsModule,
          MatTableModule,
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
  templateUrl: './residents.component.html'
})
export class ResidentsComponent {
  private service = inject(ResidentService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'blockNumber', 'flatNumber', 'mobileNumber', 'email', 'residentType', 'residencyStatus', 'actions'];
  dataSource: Resident[] = [];

  ngOnInit(): void {
    this.loadResidents();
  }

  toggleResidentStatus(resident: Resident): void {
    const dialogRef = this.dialog.open(ConfirmStatusDialogComponent, {
      width: '300px',
      data: {
        name: resident.name,
        action: resident.residencyStatus === 'ACTIVE' ? 'deactivate' : 'activate'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const action = resident.residencyStatus === 'ACTIVE' ? 'deactivateResident' : 'activateResident';
        this.service[action](resident.residentId!).subscribe(() => this.loadResidents());
      }
    });
  }

  loadResidents(): void {
    this.service.getAllResidents().subscribe({
      next: (res: any) => this.dataSource = res || [],
      error: err => console.error('Failed to load residents', err)
    });
  }

  openDialog(resident?: Resident): void {
    const dialogRef = this.dialog.open(ResidentFormDialogComponent, {
      width: '500px',
      data: resident || null
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) this.loadResidents();
    });
  }

  deactivate(residentId: string): void {
    this.service.deactivateResident(residentId).subscribe(() => this.loadResidents());
  }

  activate(residentId: string): void {
    this.service.activateResident(residentId).subscribe(() => this.loadResidents());
  }
}
