import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';

@Component({
  selector: 'app-deck-overview',
  templateUrl: './deck-overview.component.html',
  styleUrls: ['./deck-overview.component.scss']
})
export class DeckOverviewComponent implements OnInit {

  deck: Deck;
  deckId:string;

  constructor(private route: ActivatedRoute, private router: Router, private deckHttpService: DeckHttpService) { }

  ngOnInit(): void {
   this.deckId = this.route.snapshot.params['id'];

    this.deckHttpService.getById(this.deckId).subscribe((collectedDeck: IDeck) => {
      this.deck = this.deckHttpService.parseToDeck(collectedDeck);
    });
  }

  onEdit(){
    this.router.navigate(['/editDeck', this.deckId])
  }
  onDelete(){
    this.deckHttpService.delete(this.deck.id).subscribe(() => {
      this.router.navigate(['/chapterOverview', this.deck.parentId])
    })
  }
  onCreateCard(){
    this.router.navigate(['/deckOverview/createCard/', this.deck.id])
  }
  onViewCards(){
    this.router.navigate(['/deckOverview/viewCards/', this.deck.id])
  }
  onStudy(){
    this.router.navigate(['/deck/study/', this.deck.id])
  }
}
