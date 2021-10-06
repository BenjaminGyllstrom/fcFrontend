import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/Models/card.model';

@Component({
  selector: 'app-card-list-overview',
  templateUrl: './card-list-overview.component.html',
  styleUrls: ['./card-list-overview.component.scss']
})
export class CardListOverviewComponent implements OnInit {

  @Input() card: Card;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onClick() {
    this.router.navigate(['/cardOverview', this.card.id])
  }
}
