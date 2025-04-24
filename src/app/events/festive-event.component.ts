import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FestiveEventService } from 'src/app/core/services/events/festive-event.service';
import { FestiveEvent } from 'src/app/core/models/events/festive-event.model';
import { FestiveEventDialogComponent } from './dialogs/festive-event-dialog.component';

@Component({
  selector: 'app-festive-event',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './festive-event.component.html',
  styleUrls: ['./festive-event.component.scss']
})
export class FestiveEventComponent {
  private dialog = inject(MatDialog);
  private eventService = inject(FestiveEventService);
  displayedColumns: string[] = ['eventName', 'eventDate', 'venue', 'actions'];
  events: FestiveEvent[] = [];

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAll().subscribe(data => this.events = data);
  }

  openDialog(event?: FestiveEvent): void {
    const dialogRef = this.dialog.open(FestiveEventDialogComponent, {
      width: '500px',
      data: event || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (event?.id) {
          this.eventService.update(event.id, result).subscribe(() => this.loadEvents());
        } else {
          this.eventService.create(result).subscribe(() => this.loadEvents());
        }
      }
    });
  }

  deleteEvent(id: string) {
    this.eventService.delete(id).subscribe(() => this.loadEvents());
  }
}
