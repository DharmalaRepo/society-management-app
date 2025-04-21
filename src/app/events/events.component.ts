import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from 'src/app/core/services/event.service';
import { EventFormDialogComponent } from './event-form-dialog.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    EventFormDialogComponent
  ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  upcomingEvents: any[] = [];
  pastEvents: any[] = [];
  eventColumns: string[] = ['title', 'date', 'location', 'actions'];

  constructor(
    private eventService: EventService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data: any[]) => {
        const now = new Date();
        this.upcomingEvents = data.filter(event => new Date(event.date) >= now);
        this.pastEvents = data.filter(event => new Date(event.date) < now);
      },
      error: (err: any) => console.error('Failed to load events:', err)
    });
  }

  openEventDialog(eventData: any = null): void {
    const dialogRef = this.dialog.open(EventFormDialogComponent, {
      data: eventData,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEvents();
      }
    });
  }

  openDialog(eventData: any = null): void {
    this.openEventDialog(eventData);
  }

  delete(id: string): void {
    this.eventService.delete(id).subscribe(() => this.loadEvents());
  }
}