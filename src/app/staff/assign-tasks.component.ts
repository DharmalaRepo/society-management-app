import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TaskDialogComponent } from './dialogs/task-dialog.component'; // ✅ Make sure this is the correct path
import { StaffService } from '../core/services/staff.service';
import { Task } from '../core/models/staff.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-assign-tasks',
  standalone: true,
  templateUrl: './assign-tasks.component.html',
  styleUrls: ['./assign-tasks.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AssignTasksComponent {
  private dialog = inject(MatDialog);
  private staffService = inject(StaffService);
  taskList: Task[] = [];

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.staffService.getTasks().subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  openTaskDialog() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      data: {} // Pass pre-filled data here if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.staffService.createTask(result).subscribe(() => {
          this.loadTasks();
        });
      }
    });
  }
}
