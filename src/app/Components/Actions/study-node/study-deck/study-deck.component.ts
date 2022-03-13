import { DueTimerService } from './../../../../Services/dueTimer.service';
import { DueService } from './../../../../Services/Due.service';
import { CardHttpService } from './../../../../Services/Http/CardHttp.service';
import { StudyService } from './../../../../Services/Study.service';
import { Card, ICard } from './../../../../Models/card.model';
import { Subscription, interval } from 'rxjs';
import { Component, OnInit, Output, Input, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-study-deck',
  templateUrl: './study-deck.component.html',
  styleUrls: ['./study-deck.component.scss'],
  providers:[DueService, DueTimerService]
})
export class StudyDeckComponent implements OnInit {

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == "1"){
      this.onNext('button-a')
    }else if(event.key == "2"){
      this.onNext('button-b')
    }else if(event.key == "3"){
      this.onNext('button-c')
    }
  }

  @Input() cards: Card[]
  @Output('updatedRecurrence') updatedRecurrenceEmitter = new EventEmitter<Card>();

  currentCard: Card;
  dueCardAvailable: boolean = false;
  nextRecurrenceText : string[]

  showAnswer:boolean = false;
  showAnswerButtons:boolean = false;

  sub:Subscription;

  constructor(
    private studyService: StudyService,
    private cardHttpService: CardHttpService,
    private dueService: DueService,
    private dueTimerService: DueTimerService) { }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    console.log("Cards to study: " + this.cards.length);

    this.dueService.addCards(this.cards);
    this.setCurrentCard();
    this.sub = interval(3000).subscribe((val) => { this.checkDueCards(); });
  }

  onShowAnswerChange(showAnswer:boolean){
    this.showAnswer = showAnswer;
    if(this.showAnswer){
      this.showAnswerButtons = true;
    }
  }

  onNext(option: string){
    this.showAnswerButtons = false;
    this.showAnswer = false;

    if(option == "button-a"){
      this.setNextRecurrence(this.currentCard, '1')
    }
    if(option == "button-b"){
      this.setNextRecurrence(this.currentCard, '2')
    }
    if(option == "button-c"){
      this.setNextRecurrence(this.currentCard, '3')
    }

    this.setCurrentCard();
  }

  setCurrentCard(){
    const dueCard = this.dueService.GetDue();

    if(dueCard){
      this.currentCard = dueCard;
      this.nextRecurrenceText = this.studyService.calculateRecurrenceTimes(this.currentCard);
      this.dueCardAvailable = true;
      if(this.dueTimerService.timerIsActive()) this.dueTimerService.stopTimer();
    }else{
      this.dueCardAvailable = false;
      if(this.dueTimerService.timerIsActive() == false) this.setTimer();
    }
  }

  setNextRecurrence(card: Card, nextRecurrence:string){
    this.studyService.setNextRecurrence(card, nextRecurrence).subscribe((collectedCard: ICard) => {
      const updatedCard = this.cardHttpService.parseToCard(collectedCard);
      this.dueService.AddCard(updatedCard);
      this.updatedRecurrenceEmitter.emit(updatedCard);

      if(this.dueTimerService.timerIsActive()){
        const nextDueTime = this.dueService.nextDueAvailable()?.getTime();
        if(nextDueTime && this.dueTimerService.isLessThanCurrentTimer(nextDueTime))
        {
          this.dueTimerService.setTimer(nextDueTime);
        }
      }
    });
  }

  checkDueCards(){
    if(this.dueCardAvailable == false){
      this.setCurrentCard();
    }
  }

  setTimer(){
    const nextDueDate = this.dueService.nextDueAvailable()
    if(nextDueDate != null){
      this.dueTimerService.setTimer(nextDueDate.getTime())
    }
  }
}


