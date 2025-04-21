import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceDialogComponent } from './dialogs/attendance-dialog.component';
import { StaffService } from '../core/services/staff.service';
import { Attendance } from '../core/models/staff.model';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-attendance',
  standalone: true,
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  imports: [MatDialogModule, CommonModule,MatCardModule, MatButtonModule],
})
export class AttendanceComponent implements OnInit {
  attendanceList: Attendance[] = [];

  constructor(private staffService: StaffService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAttendance();
  }

  loadAttendance(): void {
    this.staffService.getAttendance().subscribe(data => {
      this.attendanceList = data;
    });
  }

  openDialog(existing?: Attendance): void {
    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      data: existing || null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.staffService.updateAttendance(result.id, result).subscribe(() => {
            this.loadAttendance();
          });
        }
      }
    });
  }
}
