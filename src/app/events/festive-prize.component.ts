import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestivePrize } from '../core/models/events/festive-prize.model';
import { FestivePrizeService } from '../core/services/events/festive-prize.service';
import { FestivePrizeDialogComponent } from './dialogs/festive-prize-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-prize',
  templateUrl: './festive-prize.component.html',
  styleUrls: ['./festive-prize.component.scss']
})
export class FestivePrizeComponent implements OnInit {
  items: FestivePrize[] = [];

  constructor(private service: FestivePrizeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestivePrize): void {
    const dialogRef = this.dialog.open(FestivePrizeDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
