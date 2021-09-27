import { Component, OnInit } from '@angular/core';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';

@Component({
  selector: 'app-my-decks',
  templateUrl: './my-decks.component.html',
  styleUrls: ['./my-decks.component.scss']
})
export class MyDecksComponent implements OnInit {

  decks:Deck[] = []

  constructor(private deckHttpService: DeckHttpService) { }

  ngOnInit(): void {
    this.deckHttpService.get().subscribe((collectedDecks: IDeck[]) => {
      this.decks = this.deckHttpService.parseToDecks(collectedDecks);
    });
  }

}
