import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BroadcastMessage } from '../../core/models/resident/broadcast-message.model';
import { ResidentService } from 'src/app/core/services/resident.service';
import { MessageDialogComponent } from './message-dialog.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule]
})
export class MessagesComponent {
  messages: BroadcastMessage[] = [];
  private service = inject(ResidentService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.fetchMessages();
  }

  fetchMessages() {
    this.service.getMessages().subscribe(data => this.messages = data);
  }

  openDialog(existingMessage?: BroadcastMessage) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: existingMessage || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existingMessage
          ? this.service.updateMessage(existingMessage.id!, result).subscribe(() => this.fetchMessages())
          : this.service.createMessage(result).subscribe(() => this.fetchMessages());
      }
    });
  }

  deleteMessage(id: string) {
    this.service.deleteMessage(id).subscribe(() => this.fetchMessages());
  }
}
