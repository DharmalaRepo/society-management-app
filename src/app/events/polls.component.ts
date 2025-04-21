import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgFor, NgIf } from '@angular/common';

import { EventFormDialogComponent } from './event-form-dialog.component';
import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-event-polls',
  standalone: true,
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    MatDialogModule,
    MatTableModule,
    MatIconModule
  ]
})
export class PollsComponent implements OnInit {
  events: any[] = [];

  constructor(
    private dialog: MatDialog,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents('RGN303').subscribe((data) => {
      this.events = data;
    });
  }

  openDialog(eventData: any = null): void {
    const dialogRef = this.dialog.open(EventFormDialogComponent, {
      data: eventData,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (eventData) {
          this.eventService.update(eventData.id, result).subscribe(() => this.loadEvents());
        } else {
          this.eventService.create({ ...result, occasionId: 'RGN303' }).subscribe(() => this.loadEvents());
        }
      }
    });
  }

  delete(id: string): void {
    this.eventService.delete(id).subscribe(() => this.loadEvents());
  }
}