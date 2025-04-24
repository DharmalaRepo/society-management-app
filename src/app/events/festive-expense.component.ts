import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FestiveExpense } from '../core/models/events/festive-expense.model';
import { FestiveExpenseService } from '../core/services/events/festive-expense.service';
import { FestiveExpenseDialogComponent } from './dialogs/festive-expense-dialog.component';

@Component({
  selector: 'app-festive-expense',
  templateUrl: './festive-expense.component.html',
  styleUrls: ['./festive-expense.component.scss']
})
export class FestiveExpenseComponent implements OnInit {
  items: FestiveExpense[] = [];

  constructor(private service: FestiveExpenseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.service.getAll().subscribe(data => this.items = data);
  }

  openDialog(item?: FestiveExpense): void {
    const dialogRef = this.dialog.open(FestiveExpenseDialogComponent, {
      width: '400px',
      data: item || {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadItems();
    });
  }
}
