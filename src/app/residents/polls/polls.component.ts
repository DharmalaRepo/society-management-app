import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { PollsService } from 'src/app/core/services/polls.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PollFormDialogComponent } from './polls-form-dialog.component';

@Component({
  selector: 'app-polls',
  standalone: true,
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PollsComponent {
  private pollService = inject(PollsService);
  private dialog = inject(MatDialog);

  polls: any[] = [];
  displayedColumns = ['question', 'options', 'actions'];

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getAll().subscribe({
      next: data => (this.polls = data),
      error: err => console.error('Failed to load polls', err)
    });
  }

  openDialog(poll: any = null) {
    const dialogRef = this.dialog.open(PollFormDialogComponent, {
      width: '400px',
      data: poll
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (poll) {
          this.pollService.update(poll.id, result).subscribe(() => this.loadPolls());
        } else {
          this.pollService.create(result).subscribe(() => this.loadPolls());
        }
      }
    });
  }

  delete(id: string) {
    this.pollService.delete(id).subscribe(() => this.loadPolls());
  }
}
