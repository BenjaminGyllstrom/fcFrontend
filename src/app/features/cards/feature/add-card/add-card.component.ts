import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { DeckHttpService } from 'src/app/Services/Http/DeckHttp.service';
import { Explain } from 'src/app/Models/explain.model';
import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Card } from 'src/app/Models/card.model';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Deck } from 'src/app/Models/deck.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getDeckIdFromRoute } from 'src/app/ngrx/card/card.selectors';
import { EMPTY, filter, map, Subscription, switchMap, tap } from 'rxjs';
import { createCard } from 'src/app/ngrx/card/card.actions';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit, OnDestroy {

  deck:Deck
  question:string = ''
  answer:string = ''
  showQuestion:boolean = true;
  content:string = '';

  explain:Explain
  showExplain:boolean;

  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.key == "Tab"){
      this.onChangeContent();
    }
    if(event.shiftKey && event.key == 'Enter'){
        this.onSave();
    }
  }

  constructor(
    private quillService: QuillService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private store: Store<AppState>
  ) { }

  deckId:string;

  sub:Subscription

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit(): void {

    this.sub = this.store.select(getDeckIdFromRoute).pipe(
      tap(deckId => this.deckId = deckId),
      switchMap(deckId => {
        if(!deckId) return EMPTY
        return this.deckHttpService.getAssociatedExplain(deckId)
      }),
      map(iExplain => {
        if(!iExplain) return undefined
        return this.explainHttpService.parseToExplain(iExplain)}),
      tap(explain => {
        if(explain) this.explain = explain})
    ).subscribe()
  }

  onShowExplain(){
    this.showExplain = !this.showExplain;
  }

  onContentChange(content:string){
    if(this.showQuestion){
      this.question = content
    }else{
      this.answer = content;
    }
  }

  onChangeContent(){
    this.showQuestion = !this.showQuestion;
  }
  onSave(){
    const card = new Card();
    card.question = this.question
    card.answer = this.answer
    card.deckId = this.deckId;

    this.store.dispatch(createCard({card:card}))
    this.reset();
  }

  reset(){
    this.question = '';
    this.answer = '';
    this.quillService.onReset.next();
    this.showQuestion = true;
  }
}
