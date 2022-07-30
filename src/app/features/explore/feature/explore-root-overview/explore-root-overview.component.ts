import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Card } from 'src/app/Models/card.model';
import { Chapter, IChapter } from 'src/app/Models/chapter.model';
import { Deck } from 'src/app/Models/deck.model';
import { Explain } from 'src/app/Models/explain.model';
import { IRoot, Root } from 'src/app/Models/root.model';
import { AppState } from 'src/app/ngrx/appState';
import { downloadRoot } from 'src/app/ngrx/root/root.actions';
import { ChapterHttpService } from 'src/app/features/shared/data-access/Http/ChapterHttp.service';
import { HttpService } from 'src/app/features/shared/data-access/Http/http.service';
import { RootHttpService } from 'src/app/features/shared/data-access/Http/RootHttp.service';
import { getRootIdFromRoute } from 'src/app/ngrx/explore/explore.selectors';
import * as fromExplore from "src/app/ngrx/explore/explore.actions";
import * as fromExploreSelectors from "src/app/ngrx/explore/explore.selectors";


@Component({
  selector: 'app-explore-root-overview',
  templateUrl: './explore-root-overview.component.html',
  styleUrls: ['./explore-root-overview.component.scss']
})
export class ExploreRootOverviewComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private rootHttpService: RootHttpService,
    private httpService: HttpService,
    private chapterHttpService: ChapterHttpService,
    private store:Store<AppState>
  ) { }


  subs:Subscription[] = []
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe()
    });
  }

  // root: Root
  root$: Observable<Root|undefined>
  rootId:string;
  // chapters: Chapter[]
  nodes: any[]

  deck: Deck|null;
  cards: Card[];

  explain: Explain|null;
  explainText:string;

  chapters$:Observable<Chapter[]>
  nodes$:Observable<any[]>

  ngOnInit(): void {
    this.subs.push(this.store.select(getRootIdFromRoute)
    .subscribe((rootId) => {
      if(rootId == undefined) return;
      this.store.dispatch(fromExplore.getRootContent({rootId:rootId}))
    }))

    this.root$ = this.store.select(fromExploreSelectors.getRootFromRoute).pipe(
      tap(root => {
        if(!root) return
        this.rootId = root.id;
        if(root.chapters && root.chapters.length > 0){
          this.onChapterClick(root.chapters[0])
        }
      })
    )
    this.chapters$ = this.store.select(fromExploreSelectors.getChaptersFromRoute)
  }


  onChapterClick(chapter: Chapter){
    this.nodes$ = this.store.select(fromExploreSelectors.getNodesForChapter(chapter.id))
    this.store.dispatch(fromExplore.getNodes({chapterId: chapter.id}))
  }

  onNodeClick(node: any){
    if(node == this.deck || node == this.explain )return


    if(node.type == 'deck') {
      this.explain = null;
      this.deck = node
      if(this.deck?.cards) this.cards = this.deck.cards;
    };
    if(node.type == 'explain') {
      this.deck = null;
      this.explain = node;
      if(this.explain?.text) this.explainText = this.explain.text;
    }
  }

  onDownload(){
    this.store.dispatch(downloadRoot({id: this.rootId}))
    // this.subs.push(this.rootHttpService.download(this.root.id).subscribe())
  }
}
