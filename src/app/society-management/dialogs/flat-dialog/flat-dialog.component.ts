import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { SocietyService } from 'src/app/core/services/society.service';
import { SocietyFlat } from 'src/app/core/models/society-registration/society-details.model';

@Component({
  selector: 'app-flat-dialog',
  standalone: true,
  templateUrl: './flat-dialog.component.html',
  styleUrls: ['./flat-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
})
export class FlatDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FlatDialogComponent>,
    private societyService: SocietyService,
    @Inject(MAT_DIALOG_DATA) public data: SocietyFlat | null
  ) {
    this.form = this.fb.group({
      blockName: [data?.blockName || '', Validators.required],
      floor: [data?.floor || '', Validators.required],
      flatNumber: [data?.flatNumber || '', Validators.required],
      type: [data?.type || '', Validators.required],
      areaInSqFt: [data?.areaInSqFt || 0, Validators.required],
      occupied: [data?.occupied || false],
    });
  }

  save() {
    if (this.form.invalid) return;

    const flat: SocietyFlat = {
      ...this.data,
      ...this.form.value,
    };

    if (flat.id) {
      this.societyService.updateFlat(flat.id, flat).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.societyService.createFlat(flat).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
