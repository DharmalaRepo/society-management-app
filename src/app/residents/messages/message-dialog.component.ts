import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Inject } from '@angular/core';
import { ResidentService } from 'src/app/core/services/resident.service';
import { BroadcastMessage } from '../../core/models/resident/broadcast-message.model';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class MessageDialogComponent {
  form: FormGroup;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<MessageDialogComponent>);
  private service = inject(ResidentService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: Partial<BroadcastMessage>) {
    this.form = this.fb.group({
      title: [data?.title || ''],
      body: [data?.message || '']
    });
  }

  submit() {
    if (this.data?.id) {
      this.service.updateMessage(this.data.id, this.form.value as BroadcastMessage).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.service.createMessage(this.form.value as BroadcastMessage).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
