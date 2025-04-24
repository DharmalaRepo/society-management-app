import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FestivePollVote } from '../../core/models/events/festive-poll-vote.model';

@Component({
  selector: 'app-festive-poll-vote-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './festive-poll-vote-dialog.component.html',
  styleUrls: ['./festive-poll-vote-dialog.component.scss']
})
export class FestivePollVoteDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FestivePollVoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FestivePollVote,
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
