import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { BudgetService } from '../core/services/budget.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './budgets.component.html',
  styleUrls: []
})
export class BudgetsComponent implements OnInit {
  budgets: any[] = [];
  displayedColumns: string[] = ['customId', 'title', 'amount', 'actions'];

  constructor(private budgetService: BudgetService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getAll().subscribe({
      next: data => this.budgets = data,
      error: () => this.snackBar.open('Failed to load budgets', 'Close', { duration: 3000 })
    });
  }

  deleteBudget(id: number): void {
    this.budgetService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Budget deleted', 'Close', { duration: 2000 });
        this.loadBudgets();
      }
    });
  }
}