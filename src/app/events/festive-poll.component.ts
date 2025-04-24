import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestivePoll } from '../core/models/events/festive-poll.model';
import { FestivePollService } from '../core/services/events/festive-poll.service';
import { FestivePollDialogComponent } from './dialogs/festive-poll-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-poll',
  templateUrl: './festive-poll.component.html',
  styleUrls: ['./festive-poll.component.scss']
})
export class FestivePollComponent implements OnInit {
  items: FestivePoll[] = [];

  constructor(private service: FestivePollService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestivePoll): void {
    const dialogRef = this.dialog.open(FestivePollDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
