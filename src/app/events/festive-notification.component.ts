import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestiveNotification } from '../core/models/events/festive-notification.model';
import { FestiveNotificationService } from '../core/services/events/festive-notification.service';
import { FestiveNotificationDialogComponent } from './dialogs/festive-notification-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-notification',
  templateUrl: './festive-notification.component.html',
  styleUrls: ['./festive-notification.component.scss']
})
export class FestiveNotificationComponent implements OnInit {
  items: FestiveNotification[] = [];

  constructor(private service: FestiveNotificationService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestiveNotification): void {
    const dialogRef = this.dialog.open(FestiveNotificationDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
