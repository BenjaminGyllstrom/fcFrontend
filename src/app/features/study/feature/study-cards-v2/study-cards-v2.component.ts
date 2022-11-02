import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Card } from 'src/app/Models/card.model';
import { AppState } from 'src/app/ngrx/appState';
import { DueTimerService } from '../../utils/dueTimer.service';
import { Observable, Subscription, tap } from 'rxjs';
import * as fromStudy from 'src/app/ngrx/study/study.actions';
import { StudyServiceV2 } from '../../utils/Study-v2.service';
import { getCardsForRoot } from 'src/app/ngrx/study/study-due-root.selector';

@Component({
  selector: 'app-study-cards-v2',
  templateUrl: './study-cards-v2.component.html',
  styleUrls: ['./study-cards-v2.component.scss'],
  providers:[DueTimerService]
})
export class StudyCardsV2Component implements OnInit, OnDestroy {

  nextRecurrenceText : string[]
  showAnswer:boolean = false;
  showAnswerButtons:boolean = false;

  cards$: Observable<{dueCards: Card[], newCards: Card[]}>
  cards : {dueCards: Card[], newCards: Card[]}
  currentCard: Card|undefined;

  constructor(
    private dueTimerService:DueTimerService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private studyService: StudyServiceV2
  ) { }

  subs:Subscription[] = []
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subs.push(this.store.select(getCardsForRoot).pipe(
      tap((cards) => {
        if(cards == undefined) return;

        if(this.currentCard == undefined){
          this.cards = cards;
          this.setCurrentCard();
        }else{
          this.studyService.removeCard(this.currentCard, cards);
          this.cards = cards
        }

      })
    ).subscribe())
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
    if(this.currentCard == undefined) return;
    this.store.dispatch(fromStudy.updateCardDue({card:this.currentCard, nextRecurrence:option}))
    this.setCurrentCard();
  }
  setCurrentCard(){
    const card = this.studyService.getNextCard(this.cards);
    this.currentCard = card;
  }
  onNav(action:string){
    this.router.navigate(['../', action], {relativeTo: this.route})
  }
}
