
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocietyFlat } from '../../core/models/society-flat.model';
import { SocietyService } from 'src/app/core/services/society.service';
import { FlatDialogComponent } from '../dialogs/flat-dialog/flat-dialog.component';

@Component({
  selector: 'app-flats',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './flats.component.html',
  styleUrls: ['./flats.component.scss']
})
export class FlatsComponent implements OnInit {
  private service = inject(SocietyService);
  private dialog = inject(MatDialog);
  data: SocietyFlat[] = [];
  displayedColumns: string[] = ['customId', 'type', 'actions'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.service.getFlats().subscribe(res => this.data = res);
  }

  openDialog(existing?: SocietyFlat) {
    const dialogRef = this.dialog.open(FlatDialogComponent, {
      width: '400px',
      data: existing || null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        existing
          ? this.service.updateFlat(existing.id!, result).subscribe(() => this.fetchData())
          : this.service.createFlat(result).subscribe(() => this.fetchData());
      }
    });
  }

  delete(id: string) {
    this.service.deleteFlat(id).subscribe(() => this.fetchData());
  }
}
