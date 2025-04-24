import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FestiveThankYouNote } from '../core/models/events/festive-thankyou-note.model';
import { FestiveThankyouNoteDialogComponent } from './dialogs/festive-thankyou-note-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-festive-thankyou-note',
  standalone: true,
  templateUrl: './festive-thankyou-note.component.html',
  styleUrls: ['./festive-thankyou-note.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    FestiveThankyouNoteDialogComponent
  ],
})
export class FestiveThankyouNoteComponent implements OnInit {
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'title', 'message', 'actions'];
  notes: FestiveThankYouNote[] = [];
  dataSource = new MatTableDataSource<FestiveThankYouNote>(this.notes);
  filterText: string = '';

  ngOnInit(): void {
    //this.fetchNotes();

    this.dataSource.filterPredicate = (data: FestiveThankYouNote, filter: string): boolean => {
      return (
        data.occasionId.toLowerCase().includes(filter) ||
        data.message.toLowerCase().includes(filter)
      );
    };
  }

  applyFilter(): void {
    this.dataSource.filter = this.filterText.trim().toLowerCase();
  }

  openDialog(note?: FestiveThankYouNote): void {
    const dialogRef = this.dialog.open(FestiveThankyouNoteDialogComponent, {
      width: '400px',
      data: note ? { ...note } : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (note) {
          const index = this.notes.findIndex(n => n.id === note.id);
          this.notes[index] = result;
        } else {
          result.id = this.notes.length + 1; // mock id
          this.notes.push(result);
        }
        this.dataSource.data = [...this.notes];
      }
    });
  }

  deleteNote(note: FestiveThankYouNote): void {
    this.notes = this.notes.filter(n => n.id !== note.id);
    this.dataSource.data = [...this.notes];
  }
}
