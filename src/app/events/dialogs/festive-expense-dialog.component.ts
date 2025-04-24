import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FestiveExpense } from '../../core/models/events/festive-expense.model';

@Component({
  selector: 'app-festive-expense-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './festive-expense-dialog.component.html',
  styleUrls: ['./festive-expense-dialog.component.scss']
})
export class FestiveExpenseDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FestiveExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FestiveExpense,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      customId: [data.customId || ''],
      active: [data.active || false]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }
}
