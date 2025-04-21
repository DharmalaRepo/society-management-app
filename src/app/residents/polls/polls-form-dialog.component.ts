import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-poll-form-dialog',
  standalone: true,
  templateUrl: './polls-form-dialog.component.html',
  styleUrls: ['./polls-form-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class PollFormDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<PollFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      question: [data?.question || '', Validators.required],
      options: [data?.options?.join(', ') || '', Validators.required]
    });
  }

  submit() {
    const result = {
      ...this.form.value,
      options: this.form.value.options.split(',').map((opt: string) => opt.trim())
    };
    this.dialogRef.close(result);
  }

  cancel() {
    this.dialogRef.close();
  }
}
