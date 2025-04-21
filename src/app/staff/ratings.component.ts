import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RatingDialogComponent } from './dialogs/rating-dialog.component';
import { StaffService } from '../core/services/staff.service';
import { Rating } from '../core/models/staff.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ratings',
  standalone: true,
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule],
})
export class RatingsComponent implements OnInit {
  ratings: Rating[] = [];

  constructor(private staffService: StaffService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRatings();
  }

  loadRatings(): void {
    this.staffService.getRatings().subscribe(data => {
      this.ratings = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RatingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.staffService.submitRating(result).subscribe(() => {
          this.loadRatings();
        });
      }
    });
  }
}
