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

  root: Root
  chapters: Chapter[]
  nodes: any[]

  deck: Deck|null;
  cards: Card[];

  explain: Explain|null;
  explainText:string;

  ngOnInit(): void {
    const rootId = this.route.snapshot.params['rootId']

    this.subs.push(this.getRoot(rootId).subscribe((root)=>{
      this.root = root
      this.chapters = root.chapters;
    }))
  }

  getRoot(rootId:string): Observable<Root>{
    return this.rootHttpService.getByIdExplore(rootId).pipe(
      map((iRoot: IRoot) => {return this.rootHttpService.parseToRoot(iRoot)})
    )
  }

  onChapterClick(chapter: Chapter){
    this.subs.push(this.chapterHttpService.getById(chapter.id).pipe(
      map((collectedChapter:IChapter)=> {
        return this.chapterHttpService.getListOfNodes(collectedChapter.nodes)
      }),
      tap((collectedNodes: any[]) => {this.nodes = collectedNodes})
    ).subscribe());
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
    this.store.dispatch(downloadRoot({id: this.root.id}))
    // this.subs.push(this.rootHttpService.download(this.root.id).subscribe())
  }
}