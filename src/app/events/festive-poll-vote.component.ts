import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestivePollVote } from '../core/models/events/festive-poll-vote.model';
import { FestivePollVoteService } from '../core/services/events/festive-poll-vote.service';
import { FestivePollVoteDialogComponent } from './dialogs/festive-poll-vote-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-poll-vote',
  templateUrl: './festive-poll-vote.component.html',
  styleUrls: ['./festive-poll-vote.component.scss']
})
export class FestivePollVoteComponent implements OnInit {
  items: FestivePollVote[] = [];

  constructor(private service: FestivePollVoteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestivePollVote): void {
    const dialogRef = this.dialog.open(FestivePollVoteDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
