import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitorAuthService } from 'src/app/core/services/visitor.service';
import { VisitorToken } from 'src/app/core/models/visitortoken.model';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  standalone: true,
  imports: [NgIf, MatCardModule, CommonModule],
})
export class TokenDetailsComponent implements OnInit {
  token: VisitorToken | null = null;
  tokenNotFound = false;

  constructor(
    private route: ActivatedRoute,
    private visitorService: VisitorService
  ) {}

  ngOnInit(): void {
    const tokenId = this.route.snapshot.paramMap.get('id');
    if (tokenId) {
      this.visitorService.getTokenById(tokenId).subscribe({
        next: (token) => {
          this.token = token;
          this.tokenNotFound = false;
        },
        error: () => {
          this.tokenNotFound = true;
        }
      });
    }
  }
}
