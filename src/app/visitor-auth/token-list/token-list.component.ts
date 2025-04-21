import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { VisitorService } from 'src/app/core/services/visitor.service';

@Component({
  selector: 'app-token-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.scss']
})
export class TokenListComponent implements OnInit {
  private visitorService = inject(VisitorService);
  private router = inject(Router);

  displayedColumns: string[] = ['token', 'visitor', 'validTill', 'actions'];
  tokenList: any[] = [];
  filteredTokens: any[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.fetchTokens();
  }

  fetchTokens(): void {
    this.visitorService.getTokenList().subscribe(data => {
      this.tokenList = data;
      this.filteredTokens = data;
    });
  }

  search(): void {
    this.filteredTokens = this.tokenList.filter(token =>
      token.token.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      token.visitorName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteToken(tokenId: string): void {
    if (confirm('Are you sure you want to delete this token?')) {
      this.visitorService.deleteToken(tokenId).subscribe(() => {
        this.fetchTokens();
      });
    }
  }

  editToken(tokenId: string): void {
    this.router.navigate(['/visitor-auth/generate'], {
      queryParams: { id: tokenId }
    });
  }

  goToDetails(tokenId: string) {
    this.router.navigate(['/visitor-auth/details', tokenId]);
  }
}
