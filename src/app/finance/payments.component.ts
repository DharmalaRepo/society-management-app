import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { PaymentService } from '../core/services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { PaymentFormDialogComponent } from './payment-form-dialog.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    PaymentFormDialogComponent
  ],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  payments: any[] = [];
  displayedColumns: string[] = ['customId', 'amount', 'description', 'actions'];

  constructor(
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.paymentService.getAll().subscribe({
      next: data => this.payments = data,
      error: () => this.snackBar.open('Failed to load payments', 'Close', { duration: 3000 })
    });
  }

  openDialog(payment: any = null): void {
    const dialogRef = this.dialog.open(PaymentFormDialogComponent, {
      width: '400px',
      data: payment
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const action = payment?.customId
          ? this.paymentService.update(payment.customId, result)
          : this.paymentService.create(result);

        action.subscribe({
          next: () => {
            const msg = payment?.customId ? 'Payment updated' : 'Payment added';
            this.snackBar.open(msg, 'Close', { duration: 2000 });
            this.fetchPayments();
          }
        });
      }
    });
  }

  deletePayment(id: number): void {
    this.paymentService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Deleted payment', 'Close', { duration: 2000 });
        this.fetchPayments();
      }
    });
  }
}