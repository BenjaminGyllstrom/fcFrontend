import { interval, Subscription } from 'rxjs';
import { CardHttpService } from './../../Services/Http/CardHttp.service';
import { StudyService } from './../../Services/Study.service';
import { DueService } from './../../Services/Due.service';
import { Card, ICard } from './../../Models/card.model';
import { Component, Input, OnInit, HostListener, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-study2',
  templateUrl: './study2.component.html',
  styleUrls: ['./study2.component.scss'],
  providers:[DueService]
})
export class Study2Component implements OnInit, OnDestroy {

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

  currentCard: Card;
  dueCardAvailable: boolean = false;
  nextRecurrenceText : string[]

  showAnswer:boolean = false;
  showAnswerButtons:boolean = false;

  dueTimerTime: number;

  sub:Subscription;

  constructor(
    private studyService: StudyService,
    private cardHttpService: CardHttpService,
    private dueService: DueService) { }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    console.log(this.cards);


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
      if(this.timerIsActive()) this.stopTimer();
    }else{
      this.dueCardAvailable = false;
      if(this.timerIsActive() == false) this.setTimer();
    }
  }

  setNextRecurrence(card: Card, nextRecurrence:string){
    this.studyService.setNextRecurrence(card, nextRecurrence).subscribe((collectedCard: ICard) => {
      const updatedCard = this.cardHttpService.parseToCard(collectedCard);
      this.dueService.AddCard(updatedCard);
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
      this.dueTimerTime = nextDueDate.getTime();
    }
  }
  stopTimer(){
    this.dueTimerTime = 0;
  }
  timerIsActive(){
    return this.dueTimerTime > 0;
  }
}
