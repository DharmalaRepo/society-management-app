import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../core/services/transaction.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './transactions.component.html',
  styleUrls: []
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  displayedColumns: string[] = ['customId', 'amount', 'type', 'description', 'actions'];

  constructor(private transactionService: TransactionService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAll().subscribe({
      next: data => this.transactions = data,
      error: () => this.snackBar.open('Failed to load transactions', 'Close', { duration: 3000 })
    });
  }

  deleteTransaction(id: number): void {
    this.transactionService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Transaction deleted', 'Close', { duration: 2000 });
        this.loadTransactions();
      }
    });
  }
}