import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deck } from 'src/app/Models/deck.model';

@Component({
  selector: 'app-deck-node',
  templateUrl: './deck-node.component.html',
  styleUrls: ['./deck-node.component.scss']
})
export class DeckNodeComponent implements OnInit {

  @Input() deck: Deck;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/deck/study/', this.deck.id])
  }
}
