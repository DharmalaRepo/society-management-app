import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FestiveCommittee } from 'src/app/core/models/events/festive-committee.model';

@Component({
  selector: 'app-festive-committee-dialog',
  standalone: true,
   templateUrl: './festive-committee-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class FestiveCommitteeDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FestiveCommitteeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FestiveCommittee | null,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      occasionId: [data?.occasionId || '', Validators.required],
      societyId: [data?.societyId || '', Validators.required],
      occasionDate: [data?.occasionDate || '', Validators.required],
      status: [data?.status || '']
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const formValue: FestiveCommittee = {
        ...this.data,
        ...this.form.value
      };
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
