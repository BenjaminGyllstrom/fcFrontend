import { ExplainHttpService } from 'src/app/features/shared/data-access/Http/ExplainHttp.service';
import { DeckHttpService } from 'src/app/features/shared/data-access/Http/DeckHttp.service';
import { Explain } from 'src/app/Models/explain.model';
import { QuillService } from 'src/app/features/shared/utils/quill.service';
import { Card } from 'src/app/Models/card.model';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Deck } from 'src/app/Models/deck.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getDeckIdFromRoute } from 'src/app/ngrx/card/card.selectors';
import { EMPTY, filter, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { createCard } from 'src/app/ngrx/card/card.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-card-v2',
  templateUrl: './add-card-v2.component.html',
  styleUrls: ['./add-card-v2.component.scss']
})
export class AddCardV2Component implements OnInit {

  deck:Deck
  question:string = '<p class="ql-align-center"></p>'
  answer:string = '<p class="ql-align-center"><br></p>'
  showQuestion:boolean = true;
  content:string = '';

  // explain:Explain

  explain$:Observable<Explain|undefined>

  showExplain:boolean;
  deckId:string;

  @HostListener('window:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.shiftKey && event.key == 'Enter'){
        this.onSave();
    }
  }

  constructor(
    private quillService: QuillService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.explain$ = this.store.select(getDeckIdFromRoute).pipe(
      tap(deckId => this.deckId = deckId),
      switchMap(deckId => {
        if(!deckId) return EMPTY
        return this.deckHttpService.getAssociatedExplain(deckId)
      }),
      map(iExplain => {
        if(!iExplain) return undefined
        return this.explainHttpService.parseToExplain(iExplain)}
      )
    );
  }

  onSave(){
    const card = new Card();
    card.question = this.question
    card.answer = this.answer
    card.deckId = this.deckId;

    console.log(card.question);


    // this.store.dispatch(createCard({card:card}))
    this.reset();
  }

  onContentChange(content: {question:string, answer:string}){
    this.question = content.question;
    this.answer = content.answer
  }

  reset(){
    this.question = '<p class="ql-align-center"></p>'
    this.answer = '<p class="ql-align-center"><br></p>'
    this.showQuestion = true;
  }

  onNav(action:string){
    this.router.navigate(['../', action], {relativeTo: this.route})
  }
}
