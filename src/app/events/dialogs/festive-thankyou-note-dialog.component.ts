import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FestiveThankYouNote } from 'src/app/core/models/events/festive-thankyou-note.model';
import { FestiveThankyouNoteService } from 'src/app/core/services/events/festive-thankyou-note.service';

@Component({
  selector: 'app-festive-thankyou-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './festive-thankyou-note-dialog.component.html',
  styleUrls: ['./festive-thankyou-note-dialog.component.scss']
})
export class FestiveThankyouNoteDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: FestiveThankyouNoteService,
    public dialogRef: MatDialogRef<FestiveThankyouNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FestiveThankYouNote
  ) {
    this.form = this.fb.group({
      customId: [data?.occasionId ?? null, Validators.required]
    });
  }

  onSubmit() {
    const payload: FestiveThankYouNote = {
      ...this.data,
      ...this.form.value
    };

    const request$ = this.data?.id
      ? this.service.update(this.data.id, payload)
      : this.service.create(payload);

    request$.subscribe(() => this.dialogRef.close(true));
  }
}
