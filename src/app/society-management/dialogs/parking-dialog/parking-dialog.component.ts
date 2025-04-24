import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';

@Component({
  selector: 'app-parking-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './parking-dialog.component.html',
  styleUrls: ['./parking-dialog.component.scss']
})
export class ParkingDialogComponent {
  form = inject(FormBuilder).group({
    name: ['', Validators.required]
  });
}
