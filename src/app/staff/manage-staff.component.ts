import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { StaffService } from '../core/services/staff.service';
import { Staff } from '../core/models/staff.model';
import { StaffFormDialogComponent } from './dialogs/staff-form-dialog.component';

@Component({
  selector: 'app-manage-staff',
  standalone: true,
  templateUrl: './manage-staff.component.html',
  imports: [
      CommonModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
      RouterModule,
      StaffFormDialogComponent
    ],
})
export class ManageStaffComponent {
  staffList: Staff[] = [];

  private dialog = inject(MatDialog);
  private staffService = inject(StaffService);

  ngOnInit() {
    this.fetchStaff();
  }

  fetchStaff() {
    this.staffService.getAllStaff().subscribe({
      next: data => (this.staffList = data)
    });
  }

  openDialog(existingStaff?: Staff) {
    const dialogRef = this.dialog.open(StaffFormDialogComponent, {
      data: existingStaff || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (existingStaff) {
          this.staffService.updateStaff(existingStaff.id, result).subscribe(() => this.fetchStaff());
        } else {
          this.staffService.createStaff(result).subscribe(() => this.fetchStaff());
        }
      }
    });
  }

  deleteStaff(id: string) {
    this.staffService.deleteStaff(id).subscribe(() => this.fetchStaff());
  }
}
