
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SocietyDialogComponent } from '../dialogs/society-dialog/society-dialog.component';
import { SocietyMaster } from 'src/app/core/models/society-master.model';
import { SocietyService } from 'src/app/core/services/society.service';

@Component({
  selector: 'app-society-master',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, MatButtonModule, MatDialogModule, SocietyDialogComponent],
  templateUrl: './society-master.component.html',
  styleUrls: ['./society-master.component.scss']
})
export class SocietyMasterComponent implements OnInit {
  private dialog = inject(MatDialog);
  private service = inject(SocietyService);
  displayedColumns: string[] = ['name', 'registrationNumber', 'city', 'actions'];
  societies: SocietyMaster[] = [];

  ngOnInit(): void {
    this.fetchSocieties();
  }

  fetchSocieties() {
    this.service.getSocieties().subscribe(data => this.societies = data);
  }

  openDialog(existing?: SocietyMaster) {
    const dialogRef = this.dialog.open(SocietyDialogComponent, {
      width: '400px',
      data: existing || null
    });

    dialogRef.afterClosed().subscribe((result: SocietyMaster | undefined) => {
      if (result) {
        existing?.id
          ? this.service.updateSociety(existing.id, result).subscribe(() => this.fetchSocieties())
          : this.service.createSociety(result).subscribe(() => this.fetchSocieties());
      }
    });
  }

  deleteSociety(id: string) {
    this.service.deleteSociety(id).subscribe(() => this.fetchSocieties());
  }
}
