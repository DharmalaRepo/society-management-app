import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestiveFundContribution } from '../core/models/events/festive-fund-contribution.model';
import { FestiveFundContributionService } from '../core/services/events/festive-fund-contribution.service';
import { FestiveFundContributionDialogComponent } from './dialogs/festive-fund-contribution-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-fund-contribution',
  templateUrl: './festive-fund-contribution.component.html',
  styleUrls: ['./festive-fund-contribution.component.scss']
})
export class FestiveFundContributionComponent implements OnInit {
  items: FestiveFundContribution[] = [];

  constructor(private service: FestiveFundContributionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestiveFundContribution): void {
    const dialogRef = this.dialog.open(FestiveFundContributionDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
