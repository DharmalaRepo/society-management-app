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
import { MatTableDataSource } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AlertReminder } from 'src/app/core/models/resident/alert-reminder.model';
import { ResidentService } from 'src/app/core/services/residents/resident.service';
import { SocietyConfigService } from 'src/app/core/services/society-config.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
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
],
})
export class AlertDialogComponent {
  form: FormGroup;
  flatOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    private residentService: ResidentService,
    private configService: SocietyConfigService,
    @Inject(MAT_DIALOG_DATA) public data: AlertReminder | null
  ) {
    this.form = this.fb.group({
      title: [data?.title || '', Validators.required],
      message: [data?.message || '', Validators.required],
      triggerDate: [data?.triggerDate || '', Validators.required],
      deliveryMethods: [data?.deliveryMethods || [], Validators.required],
      residentId: [data?.residentId || '', Validators.required]
    });

    this.flatOptions = this.configService.getFlatBlockFloorLabels();
  }



  save() {
    if (this.form.valid) {
      const reminder: AlertReminder = this.form.value;
      if (this.data && this.data.reminderId) {
        reminder.reminderId = this.data.reminderId;
      }
      this.dialogRef.close(reminder);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
