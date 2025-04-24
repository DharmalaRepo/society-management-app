import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Guest } from 'src/app/core/models/resident/guest.model';
import { ResidentService } from 'src/app/core/services/resident.service';
import { GuestDialogComponent } from './guest-dialog.component';

@Component({
  selector: 'app-guests',
  standalone: true,
  templateUrl: './guests.component.html',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule]
})
export class GuestsComponent {
  guests: Guest[] = [];
  private service = inject(ResidentService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.fetchGuests();
  }

  fetchGuests() {
    this.service.getGuests().subscribe(data => this.guests = data);
  }

  openDialog(existingGuest?: Guest) {
    const dialogRef = this.dialog.open(GuestDialogComponent, {
      data: existingGuest || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existingGuest
          ? this.service.updateGuest(existingGuest.id!, result).subscribe(() => this.fetchGuests())
          : this.service.createGuest(result).subscribe(() => this.fetchGuests());
      }
    });
  }

  deleteGuest(id: string) {
    this.service.deleteGuest(id).subscribe(() => this.fetchGuests());
  }
}
