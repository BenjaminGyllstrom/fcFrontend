import { ItemsService } from './../../../../Services/items.service';
import { SideBarService } from './../../../../Services/sideBar.service';
import { DeckHttpService } from './../../../../Services/Http/DeckHttp.service';
import { ExplainHttpService } from './../../../../Services/Http/ExplainHttp.service';
import { FormBuilder } from '@angular/forms';
import { Deck, IDeck } from './../../../../Models/deck.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getChapterIdFromRoute } from 'src/app/ngrx/chapter/chapter.selectors';
import { createNode } from 'src/app/ngrx/node/node.actions';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.scss']
})
export class AddDeckComponent implements OnInit {

  chapterId:string;
  explainsInChapter$: Observable<any[]>
  selectedExplain:any;

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  deckForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {

    this.explainsInChapter$ = this.store.select(getChapterIdFromRoute).pipe(
      tap(chapterId=> this.chapterId = chapterId),
      switchMap((chapterId)=>{
        return this.explainHttpService.getTitlesInChapter(chapterId)
      })
    )
  }

  onSubmit(){
    const title = this.deckForm.value.title;
    const deck = new Deck(title);
    deck.parentId = this.chapterId;
    deck.associatedExplain = this.selectedExplain?._id

    this.store.dispatch(createNode({node:deck}))
    this.reset();
  }

  reset(){
    this.deckForm.reset();
    this.selectedExplain = null;
  }
}
