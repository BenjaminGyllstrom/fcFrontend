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
import { getChapterIdFromRoute } from 'src/app/ngrx/chapter/chapter.selectors';
import { getRootIdFromRoute } from 'src/app/ngrx/root/root.selectors';
import { RangeStatic } from 'quill';

@Component({
  selector: 'app-add-card-v3',
  templateUrl: './add-card-v3.component.html',
  styleUrls: ['./add-card-v3.component.scss']
})
export class AddCardV3Component implements OnInit, OnDestroy {

  deck:Deck
  question:string = ''
  questionSelection:RangeStatic
  answer:string = ''
  answerSelection:RangeStatic
  explain$:Observable<Explain|undefined>
  showExplain:boolean;
  deckId:string;
  chapterId: string
  rootId: string


  constructor(
    private quillService: QuillService,
    private deckHttpService: DeckHttpService,
    private explainHttpService: ExplainHttpService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }


  subs: Subscription[] = []
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.subs.push(this.store.select(getDeckIdFromRoute).pipe(
      tap(deckId => this.deckId = deckId),
    ).subscribe())

    this.subs.push(this.store.select(getChapterIdFromRoute).pipe(
      tap(chapterId => this.chapterId = chapterId),
    ).subscribe())

    this.subs.push(this.store.select(getRootIdFromRoute).pipe(
      tap(rootId => this.rootId = rootId),
    ).subscribe())

    this.explain$ = this.store.select(getDeckIdFromRoute).pipe(
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
    card.chapterId = this.chapterId;
    card.rootId = this.rootId;

    // this.store.dispatch(createCard({card:card}))
    this.reset();
  }

  onContentChange(content: {question:string, answer:string}){
    this.question = content.question;
    this.answer = content.answer
  }

  questionChange(content: string){
    this.question = content;
  }
  questionSelectionChange(selection: RangeStatic){
    console.log(selection);

    this.questionSelection = selection
  }
  answerChange(content: string){
    this.answer = content;
  }
  answerSelectionChange(selection: RangeStatic){
    this.answerSelection = selection
  }
  reset(){
    this.question = ''
    this.answer = ''
    // this.quillService.onReset.next();
  }

  onNav(action:string){
    this.router.navigate(['../', action], {relativeTo: this.route})
  }
}
