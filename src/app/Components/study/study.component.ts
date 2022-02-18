import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Card, ICard } from 'src/app/Models/card.model';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { StudyService } from 'src/app/Services/Study.service';
import { interval } from 'rxjs';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  cards: Card[];


  constructor(
    private route: ActivatedRoute,
    private deckHttpService: DeckHttpService,
    private cardHttpService: CardHttpService,
    private chapterHttpService: ChapterHttpService) { }

  ngOnInit(): void {
    const type = this.route.snapshot.params['type'];
    const id = this.route.snapshot.params['id'];

    if(type=='deck'){
      this.deckHttpService.getById(id).subscribe((collectedDeck: IDeck) => {
        const deck = this.deckHttpService.parseToDeck(collectedDeck);
        this.cards = deck.cards;
      })
    }else if(type=='chapter'){
      console.log('study chapter');
      this.chapterHttpService.getDueCards(id).subscribe((collectedCards:ICard[]) => {
        this.cards = this.cardHttpService.parseToCards(collectedCards);
      })
    }else if(type=='root'){

    }
  }
}
