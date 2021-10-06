import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-deck-list-overview',
  templateUrl: './deck-list-overview.component.html',
  styleUrls: ['./deck-list-overview.component.scss']
})
export class DeckListOverviewComponent implements OnInit {

  @Input() deck: Deck;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/deckOverview', this.deck.id])
  }
}
