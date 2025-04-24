import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestiveVolunteer } from '../core/models/events/festive-volunteer.model';
import { FestiveVolunteerService } from '../core/services/events/festive-volunteer.service';
import { FestiveVolunteerDialogComponent } from './dialogs/festive-volunteer-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-volunteer',
  templateUrl: './festive-volunteer.component.html',
  styleUrls: ['./festive-volunteer.component.scss']
})
export class FestiveVolunteerComponent implements OnInit {
  items: FestiveVolunteer[] = [];

  constructor(private service: FestiveVolunteerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestiveVolunteer): void {
    const dialogRef = this.dialog.open(FestiveVolunteerDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
