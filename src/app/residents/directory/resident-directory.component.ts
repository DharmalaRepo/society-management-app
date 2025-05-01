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
import { Resident } from 'src/app/core/models/resident/resident.model';

@Component({
  selector: 'app-resident-directory',
  templateUrl: './resident-directory.component.html',
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
})
export class ResidentDirectoryComponent implements OnInit {
  dataSource = new MatTableDataSource<Resident>([]);
  displayedColumns = ['name', 'blockNumber', 'flatNumber', 'mobileNumber', 'residentType'];
  filterText: string = '';

  constructor(private residentService: ResidentService) {}

  ngOnInit(): void {
    this.residentService.getAllResidents().subscribe((residents: Resident[]) => {
      const directoryResidents = residents.filter(r => r.showInDirectory);
      this.dataSource.data = directoryResidents;
    });
  }

  applyFilter(): void {
    const filterValue = this.filterText?.trim().toLowerCase() || '';

    this.dataSource.filterPredicate = (data: Resident, filter: string) => {
      return [
        data.name,
        data.flatNumber,
        data.blockNumber
      ].some(value =>
        value?.toLowerCase().includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }
}
