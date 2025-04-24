import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FestiveEvent } from 'src/app/core/models/events/festive-event.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-festive-event-dialog',
  templateUrl: './festive-event-dialog.component.html',
  styleUrls: ['./festive-event-dialog.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule]
})
export class FestiveEventDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FestiveEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FestiveEvent
  ) {
    this.form = this.fb.group({
      occasionId: [data.occasionId, Validators.required],
      committeeId: [data.committeeId, Validators.required],
      societyId: [data.societyId, Validators.required],
      eventName: [data.eventName, Validators.required],
      eventDate: [data.eventDate, Validators.required],
      venue: [data.venue],
      description: [data.description],
      poc: [data.poc]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
