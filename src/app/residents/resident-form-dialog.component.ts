import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';

import { SocietyDetailsResponseDTO, SocietyFlat } from 'src/app/core/models/society-registration/society-details.model';
import { Resident } from 'src/app/core/models/resident/resident.model';
import { SocietyConfigService } from 'src/app/core/services/society-config.service';

@Component({
  selector: 'app-resident-form-dialog',
  templateUrl: './resident-form-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ]
})
export class ResidentFormDialogComponent implements OnInit {
  form: FormGroup;
  blocks: string[] = [];
  flats: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ResidentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Resident | null,
    private societyConfigService: SocietyConfigService
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      mobileNumber: [data?.mobileNumber || '', Validators.required],
      email: [data?.email || ''],
      whatsappNumber: [data?.whatsappNumber || ''],
      blockNumber: [data?.blockNumber || '', Validators.required],
      flatNumber: [data?.flatNumber || '', Validators.required],
      residentType: [data?.residentType || 'OWNER', Validators.required],
      residencyStatus: [data?.residencyStatus || 'ACTIVE'],
      moveInDate: [data?.moveInDate ? new Date(data.moveInDate) : ''],
      moveOutDate: [data?.moveOutDate ? new Date(data.moveOutDate) : ''],
      showInDirectory: [data?.showInDirectory ?? true]
    });
  }

  ngOnInit(): void {
    const societyDetails = this.societyConfigService.getSocietyConfig(); // <- Corrected call

    this.blocks = [...new Set((societyDetails?.flats || []).map(f => f.blockName))];
    this.flats = (societyDetails?.flats || []).map(
      (f: SocietyFlat) => `${f.blockName}-${f.floor}-${f.flatNumber}`
    );

    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close({ ...this.data, ...this.form.value });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
