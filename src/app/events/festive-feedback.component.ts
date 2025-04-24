import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestiveFeedback } from '../core/models/events/festive-feedback.model';
import { FestiveFeedbackService } from '../core/services/events/festive-feedback.service';
import { FestiveFeedbackDialogComponent } from './dialogs/festive-feedback-dialog.component';

@Component({
  selector: 'app-festive-feedback',
  templateUrl: './festive-feedback.component.html',
  styleUrls: ['./festive-feedback.component.scss']
})
export class FestiveFeedbackComponent implements OnInit {
  items: FestiveFeedback[] = [];

  constructor(private service: FestiveFeedbackService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestiveFeedback): void {
    const dialogRef = this.dialog.open(FestiveFeedbackDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
