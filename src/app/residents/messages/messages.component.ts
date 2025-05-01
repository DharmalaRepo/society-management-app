import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { BroadcastMessage } from 'src/app/core/models/resident/broadcast-message.model';
import { ResidentService } from 'src/app/core/services/residents/resident.service';
import { MessageDialogComponent } from './message-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule
  ],
})
export class MessagesComponent implements OnInit {
  private service = inject(ResidentService);
  private dialog = inject(MatDialog);
  messages: BroadcastMessage[] = [];

  displayedColumns: string[] = ['title', 'message', 'audience', 'deliveryMethods', 'actions'];
  dataSource = new MatTableDataSource<BroadcastMessage>([]);

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.service.getAllBroadcasts().subscribe({
      next: (messages: BroadcastMessage[]) => {
        this.dataSource.data = messages || [];
      },
      error: (err:any) => {
        console.error('Failed to load broadcasts', err);
      }
    });
  }

  openDialog(data?: BroadcastMessage): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const req: BroadcastMessage = { ...result };
        if (data?.broadcastId) {
          req.broadcastId = data.broadcastId;
        }

        this.service.sendBroadcast(req).subscribe(() => {
          this.fetchMessages();
        });
      }
    });
  }

   deleteMessage(id: string): void {
     this.service.deleteBroadcast(id).subscribe(() => {
       this.fetchMessages();
     });
   }
}
