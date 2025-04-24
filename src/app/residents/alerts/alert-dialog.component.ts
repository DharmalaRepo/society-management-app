import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Alert } from 'src/app/core/models/alert.model';

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class AlertDialogComponent {
  form: FormGroup;
  private dialogRef = inject(MatDialogRef<AlertDialogComponent>);
  private fb = inject(FormBuilder);

  constructor() {
    const data = this.dialogRef._containerInstance._config.data as Alert | undefined;
    this.form = this.fb.group({
      title: [data?.title || '', Validators.required],
      message: [data?.message || '', Validators.required],
      date: [data?.triggerDate || '', Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
