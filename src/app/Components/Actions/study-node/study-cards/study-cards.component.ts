import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { iif, Observable, Subscription, tap } from 'rxjs';
import { Card } from 'src/app/Models/card.model';
import { AppState } from 'src/app/ngrx/appState';
import * as fromStudy from 'src/app/ngrx/study/study.actions';
import { cardsToStudyAvailable, getNextCardStudyForRoute, getNextDueCardStudyForRoute, timeUntilDue } from 'src/app/ngrx/study/study.selectors';
import { DueTimerService } from 'src/app/Services/dueTimer.service';
// import * as fromStudy from ""
@Component({
  selector: 'app-study-cards',
  templateUrl: './study-cards.component.html',
  styleUrls: ['./study-cards.component.scss'],
  providers:[DueTimerService]
})
export class StudyCardsComponent implements OnInit {

  constructor(
    private dueTimerService:DueTimerService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router) { }

  card$:Observable<Card|undefined>
  cardsToStudyAvailable$:Observable<boolean>

  nextRecurrenceText : string[]
  showAnswer:boolean = false;
  showAnswerButtons:boolean = false;

  skipWaitTime = false

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {

  this.card$ = this.store.select(getNextDueCardStudyForRoute).pipe(
    tap(card => {
      if(card) this.nextRecurrenceText = calculateRecurrenceTimes(card);
    })
  )

  this.cardsToStudyAvailable$ = this.store.select(cardsToStudyAvailable)

  this.sub = this.store.select(timeUntilDue).subscribe((time)=>{
    const dateNow = new Date();

    if(!time || time - dateNow.getTime() <= 0){
      this.dueTimerService.stopTimer();
      return;
    }

    this.dueTimerService.setTimer(time)
  })
  }

  skipWait(){
    this.skipWaitTime = !this.skipWaitTime
    this.card$ = iif(()=>this.skipWaitTime,
    this.store.select(getNextCardStudyForRoute),
    this.store.select(getNextDueCardStudyForRoute)).pipe(
      tap(card => {
        if(card) this.nextRecurrenceText = calculateRecurrenceTimes(card);
      })
    )
  }

  onNext(card:Card, option: string){
    this.showAnswerButtons = false;
    this.showAnswer = false;
    this.store.dispatch(fromStudy.updateCardDue({card:card, nextRecurrence:option}))
  }
  onComplete(){
    this.router.navigate(['../../../'], {relativeTo: this.route})
  }
  onShowAnswerChange(showAnswer:boolean){
    this.showAnswer = showAnswer;
    if(this.showAnswer){
      this.showAnswerButtons = true;
    }
  }
}


export function calculateRecurrenceTimes(card: Card) : string[]{
  if(card.recurrenceNumber == 0){
    return ['1 min', '10 min', '4 days'];
  }else{
    return ['10 min', `${2 ** card.recurrenceNumber} days`, `${2 ** (card.recurrenceNumber + 1)} days`];
  }
}
