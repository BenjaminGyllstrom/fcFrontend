import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/Models/card.model';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {

  deck: Deck;
  cards: Card[];

  constructor(private route: ActivatedRoute, private router: Router, private deckHttpService: DeckHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['deckId'];
    this.deckHttpService.getById(id).subscribe((collectedDeck: IDeck) => {
      this.deck = this.deckHttpService.parseToDeck(collectedDeck);
      this.cards = this.deck.cards;
    });
  }

}
