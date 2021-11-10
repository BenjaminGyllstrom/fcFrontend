import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Card, ICard } from 'src/app/Models/card.model';
import { Deck, IDeck } from 'src/app/Models/deck.model';
import { CardHttpService } from 'src/app/Services/Http/CardHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { StudyService } from 'src/app/Services/Study.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit, OnDestroy {

  deckId: string;
  deck: Deck;
  cards: Card[];
  currentCard: Card;
  dueCardsAvailable: boolean = false;

  sub:Subscription;

  notDueCards: Card[];

  showAnswer:boolean = false;
  showAnswerButtons:boolean = false;

  nextRecurrence : string[]

  minutes: number;
  seconds: number;
  interval: any;

  constructor(private router: Router, private route: ActivatedRoute, private deckHttpService: DeckHttpService, private cardHttpService: CardHttpService, private studyService: StudyService) { }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    const deckId = this.route.snapshot.params['deckId'];
    this.deckId = deckId;

    this.deckHttpService.getById(deckId).subscribe((collectedDeck: IDeck) => {
      this.deck = this.deckHttpService.parseToDeck(collectedDeck);
    })

    this.deckHttpService.getDueCards(deckId).subscribe((collectedCards: ICard[]) => {
      const cards = this.cardHttpService.parseToCards(collectedCards);

      const dueCards: Card[] = [];
      const notDueCards: Card[] = [];
      cards.forEach(card => {
        if(this.studyService.isDue(card)){
          console.log('due');
          dueCards.push(card);
        }else if(this.studyService.lastStudiedToday(card)){
          console.log('not yet due, but studied today');

          notDueCards.push(card);
        }else{
          console.log('not yet due');
          dueCards.push(card);
        }
      });

      this.cards = dueCards;
      this.notDueCards = notDueCards;

      this.setCurrentCard();
    })

    this.notDueCards = [];

    this.sub = interval(3000).subscribe((val) => { this.checkDueCards(); });
  }

  setTimer(){

    if(this.notDueCards.length < 1){
      return;
    }

    clearInterval(this.interval)

    const dateNow = new Date();
    const nextCard = this.notDueCards[0]

    let timeDifference = nextCard.dueDate.getTime() - dateNow.getTime();
    timeDifference = timeDifference / 1000
    this.minutes = Math.floor(timeDifference / 60);
    this.seconds = Math.round(timeDifference - this.minutes * 60);

    this.interval = setInterval(() => {
      if(this.seconds > 0) {
        this.seconds--;
      } else {
        if(this.minutes > 0){
          this.minutes--;
          this.seconds = 59;
        }else{
          clearInterval(this.interval)
        }
      }
    },1000)
  }

  sortNotDue(){
    const sorted = this.notDueCards.sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  checkDueCards(){

    const cardsDue: Card[] = [];

    this.notDueCards.forEach(card => {
      if(this.studyService.isDue(card)){
        cardsDue.push(card);
      }
    });

    cardsDue.forEach(card => {

      console.log('new due');
      this.notDueCards.splice(this.notDueCards.indexOf(card), 1)

      if(this.cards.length < 1){
        this.cards.push(card);
        this.setCurrentCard()
      }else{
        this.cards.push(card);
      }
    });
  }


  onNext(option: string){
    const currentCard = this.currentCard;
    this.showAnswerButtons = false;
    this.removeCurrentCardFromDue();
    this.setNumNewCardsOnDeck(currentCard);
    this.setCurrentCard();

    if(option == "button-a"){
      this.studyService.setNextRecurrence(currentCard, '1').subscribe((collectedCard: ICard) => {
        const updatedCard = this.cardHttpService.parseToCard(collectedCard);
        if(this.studyService.isDue(updatedCard)){
          this.cards.push(updatedCard);
        }
        else if(this.studyService.isDueToday(updatedCard)){
          this.notDueCards.push(updatedCard)
          this.sortNotDue();
          if(this.notDueCards[0] == updatedCard){
            this.setTimer();
          }
        }
      });

    }else if(option == "button-b"){
      this.studyService.setNextRecurrence(currentCard, '2').subscribe((collectedCard: ICard) => {
        const updatedCard = this.cardHttpService.parseToCard(collectedCard);
        if(this.studyService.isDue(updatedCard)){
          this.cards.push(updatedCard);
        }
        else if(this.studyService.isDueToday(updatedCard)){

          this.notDueCards.push(updatedCard)
          this.sortNotDue();
          if(this.notDueCards[0] == updatedCard){
            this.setTimer();
          }
        }
      });

    }else if(option == "button-c"){
      this.studyService.setNextRecurrence(currentCard, '3').subscribe((collectedCard: ICard) => {
        const updatedCard = this.cardHttpService.parseToCard(collectedCard);
        if(this.studyService.isDue(updatedCard)){
          this.cards.push(updatedCard);
        }
        else if(this.studyService.isDueToday(updatedCard)){
          this.notDueCards.push(updatedCard)
          this.sortNotDue();
          if(this.notDueCards[0] == updatedCard){
            this.setTimer();
          }
        }
      });

    }else{

    }
  }

  removeCurrentCardFromDue(){
    this.cards.splice(this.cards.indexOf(this.currentCard), 1);
  }
  setNumNewCardsOnDeck(card: Card){
    if(card.new){
      this.deck.newCards -= 1;
    }
  }
  setCurrentCard(){
    this.showAnswer = false;

    if(this.cards.length > 0){
      this.currentCard = this.cards[0];
      this.dueCardsAvailable = true;
      this.nextRecurrence = this.studyService.calculateRecurrenceTimes(this.currentCard);
    }
    else{
      this.sortNotDue();
      this.setTimer();
      this.dueCardsAvailable = false;
    }
  }

  onContinueStudy(){
    this.router.navigate(['/chapterStudy', this.deck.parentId])
  }
}
