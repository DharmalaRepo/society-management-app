import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocietyMaintenanceSetting } from 'src/app/core/models/society-registration/society-details.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-maintenance-dialog',
  templateUrl: './maintenance-dialog.component.html',
  standalone: true,
  imports: [MatFormFieldModule,
              MatInputModule,
              MatDatepickerModule,
              MatNativeDateModule,
              ReactiveFormsModule,
              MatDialogModule,
              MatButtonModule],
})
export class MaintenanceDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaintenanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SocietyMaintenanceSetting | null
  ) {
    this.form = this.fb.group({
      frequency: [data?.frequency || '', Validators.required],
      amount: [data?.amount || '', [Validators.required, Validators.min(0)]],
      dueDate: [data?.dueDate || '', Validators.required],
      lateFee: [data?.lateFee || '', [Validators.required, Validators.min(0)]],
      isActive: [data?.isActive === 1, Validators.required],
    });
  }

  onSave() {
    if (this.form.valid) {
      const setting: SocietyMaintenanceSetting = {
        ...this.data,
        ...this.form.value,
        isActive: this.form.value.isActive ? 1 : 0,
      };
      this.dialogRef.close(setting);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const maintenanceSetting = {
        ...this.data,
        ...this.form.value
      };
      this.dialogRef.close(maintenanceSetting);
    }
  }
}
