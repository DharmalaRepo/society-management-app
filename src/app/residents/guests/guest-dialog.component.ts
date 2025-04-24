import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Guest } from 'src/app/core/models/resident/guest.model';
import { ResidentService } from 'src/app/core/services/resident.service';

@Component({
  selector: 'app-guest-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './guest-dialog.component.html'
})
export class GuestDialogComponent {
  form: FormGroup;
  service = inject(ResidentService);
  dialogRef = inject(MatDialogRef<GuestDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [this.data?.name ?? '', Validators.required],
      contact: [this.data?.contact ?? '', Validators.required],
      visitDate: [this.data?.visitDate ?? '', Validators.required],
    });
  }

  submit() {
    const payload = this.form.value as Guest;
    if (this.data?.id) {
      this.service.updateGuest(this.data.id, payload).subscribe(() => this.dialogRef.close(true));
    } else {
      this.service.createGuest(payload).subscribe(() => this.dialogRef.close(true));
    }
  }
}
