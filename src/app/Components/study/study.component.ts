import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card, ICard } from 'src/app/Models/card.model';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { StudyService } from 'src/app/Services/Study.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {

  deckId: string;
  deck: Deck;
  cards: Card[];
  currentCard: Card;
  dueCardsAvailable: boolean = false;

  showAnswer:boolean = false;
  showAnswerButtons:boolean = false;

  nextRecurrence : string[]

  constructor(private router: Router, private route: ActivatedRoute, private deckHttpService: DeckHttpService, private cardHttpService: CardHttpService, private studyService: StudyService) { }

  ngOnInit(): void {
    const deckId = this.route.snapshot.params['deckId'];
    this.deckId = deckId;

    this.deckHttpService.getById(deckId).subscribe((collectedDeck: IDeck) => {
      this.deck = this.deckHttpService.parseToDeck(collectedDeck);
    })

    this.deckHttpService.getDueCards(deckId).subscribe((collectedCards: ICard[]) => {
      const cards = this.cardHttpService.parseToCards(collectedCards);
      this.cards = cards;

      this.setCurrentCard();
    })
  }


  onNext(option: string){
    const currentCard = this.currentCard;
    this.removeCurrentCardFromDue();
    this.setCurrentCard();

    if(option == "button-a"){
      this.studyService.setNextRecurrence(currentCard, '1').subscribe((collectedCard: ICard) => {
        const updatedCard = this.cardHttpService.parseToCard(collectedCard);
        if(this.studyService.isDue(updatedCard)){
          this.cards.push(updatedCard);
        }
      });

    }else if(option == "button-b"){
      this.studyService.setNextRecurrence(currentCard, '2').subscribe((collectedCard: ICard) => {
        const updatedCard = this.cardHttpService.parseToCard(collectedCard);
        if(this.studyService.isDue(updatedCard)){
          this.cards.push(updatedCard);
        }
      });

    }else if(option == "button-c"){
      this.studyService.setNextRecurrence(currentCard, '3').subscribe((collectedCard: ICard) => {
        const updatedCard = this.cardHttpService.parseToCard(collectedCard);
        if(this.studyService.isDue(updatedCard)){
          this.cards.push(updatedCard);
        }
      });

    }else{

    }
  }

  removeCurrentCardFromDue(){
    this.cards.splice(this.cards.indexOf(this.currentCard), 1);
  }

  setCurrentCard(){
    if(this.cards.length > 0){
      this.showAnswer = false;
      this.currentCard = this.cards[0];
      this.dueCardsAvailable = true;
      this.nextRecurrence = this.studyService.calculateRecurrenceTimes(this.currentCard);
    }
    else{
      this.dueCardsAvailable = false;
    }
  }

  onContinueStudy(){
    this.router.navigate(['/chapterStudy', this.deck.parentId])
  }
}
