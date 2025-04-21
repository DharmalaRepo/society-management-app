import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  template: `
    <h1 mat-dialog-title>Assign Task</h1>
    <div mat-dialog-content>
      <p>Task Details</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button [mat-dialog-close]="true">Save</button>
    </div>
  `,
})
export class TaskDialogComponent {}
