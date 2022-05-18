import { FormBuilder } from '@angular/forms';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { Deck } from 'src/app/Models/deck.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { updateNode } from 'src/app/ngrx/node/node.actions';
import { EMPTY, map, Subscription, switchMap, tap } from 'rxjs';
import { getNodeFromRoute } from 'src/app/ngrx/node/node.selectors';

@Component({
  selector: 'app-deck-overview',
  templateUrl: './deck-overview.component.html',
  styleUrls: ['./deck-overview.component.scss']
})
export class DeckOverviewComponent implements OnInit {

  deck:Deck
  edit:boolean;

  chapterId:string;
  explainsInChapter: any[]
  selectedExplain:any;

  startValues:{title:string, explain: any}

  deckForm = this.formBuilder.group({
    title:''
  });

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private store:Store<AppState>) { }

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }
  ngOnInit(): void {
    this.sub = this.store.select(getNodeFromRoute).pipe(
      map(node => node?.type == 'deck'? node as Deck: undefined),
      tap(node => {
        if(node){
          this.deck = {...node};
          this.deckForm = this.formBuilder.group({
            title:this.deck.title
          });
          this.startValues = {title: this.deck.title, explain: null};
        }}),
      switchMap(node => {
        if(node) return this.explainHttpService.getTitlesInChapter(node.parentId)
        return EMPTY
      }),
      tap((explainsInChapter: {title:string, _id:string}[])=>{
        if(this.deck){
          this.explainsInChapter = explainsInChapter;
          if(this.deck.associatedExplain != null)
          {
            this.selectedExplain = this.explainsInChapter.find(explain => explain._id == this.deck.associatedExplain);
            this.startValues.explain = this.selectedExplain;
          }

        }
      })
    ).subscribe();
  }

  onInputChange(){
    this.edit = true;
  }
  onExplainChange(){
    this.edit = true;
  }

  onSave(){
    if(!this.deck) return

    this.deck.title = this.deckForm.value.title;
    this.deck.associatedExplain = this.selectedExplain?._id;

    this.store.dispatch(updateNode({node:this.deck}))
    this.edit=false
  }
  onCancel(){
    this.edit = false;
    this.deckForm = this.formBuilder.group({
      title:this.startValues.title
    });

    this.selectedExplain = this.startValues.explain;
  }
}
