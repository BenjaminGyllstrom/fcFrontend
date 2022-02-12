import { Router } from '@angular/router';
import { Card } from 'src/app/Models/card.model';
import { Deck } from 'src/app/Models/deck.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cards-playground',
  templateUrl: './view-cards-playground.component.html',
  styleUrls: ['./view-cards-playground.component.scss']
})
export class ViewCardsPlaygroundComponent implements OnInit {


  @Input() deck: Deck;
  cards: Card[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cards = this.deck.cards
  }

  onEdit(card: Card){
    this.router.navigate(['/editCard', card.id])
  }

}
