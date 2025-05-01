import { Component, Inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-confirm-status-dialog',
  templateUrl: './confirm-status-dialog.component.html',
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
export class ConfirmStatusDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; action: 'activate' | 'deactivate' }
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
