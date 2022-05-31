import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/ngrx/appState';
import { getDeckCards } from 'src/app/ngrx/card/card.actions';
import { getDeckIdFromRoute } from 'src/app/ngrx/card/card.selectors';
import { getRootChapters } from 'src/app/ngrx/chapter/chapter.actions';
import { getChapterIdFromRoute } from 'src/app/ngrx/chapter/chapter.selectors';
import { getChapterNodes } from 'src/app/ngrx/node/node.actions';
import { getAllRoots } from 'src/app/ngrx/root/root.actions';
import { getRootIdFromRoute } from 'src/app/ngrx/root/root.selectors';
import { studyDeck } from 'src/app/ngrx/study/study.actions';
import { getDeckIdStudyFromRoute } from 'src/app/ngrx/study/study.selectors';
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
  providers: []
})
export class MyContentComponent implements OnInit, OnDestroy {

  constructor(
    private observer: BreakpointObserver,
    private store: Store<AppState>) { }

  @ViewChild(MatSidenav) sidenav!:MatSidenav

  ngAfterViewInit(){
    this.subs.push(this.observer.observe(['(min-width:750px)']).pipe(
      tap((res)=>{setTimeout(()=>{
        if(res.matches){
          this.sidenav.mode = 'side'
          this.sidenav.open()
        }else{
          this.sidenav.mode = 'over'
          this.sidenav.close()
        }
      },10)})).subscribe())
  }

  subs:Subscription[] = []
  ngOnDestroy(): void {

    this.subs.forEach(sub =>{
      sub.unsubscribe();
    })
  }

  mode = 'side'
  open = true

  ngOnInit(): void {
    this.store.dispatch(getAllRoots())

    this.subs.push(this.store.select(getRootIdFromRoute)
    .subscribe((rootId) => {
      if(rootId == undefined) return;
      this.store.dispatch(getRootChapters({rootId:rootId}))
    }))


    this.subs.push(this.store.select(getChapterIdFromRoute)
    .subscribe((chapterId) => {
      if(chapterId == undefined) return;
      this.store.dispatch(getChapterNodes({chapterId:chapterId}))
    }))

    this.subs.push(this.store.select(getDeckIdFromRoute)
    .subscribe((deckId) => {
      if(deckId == undefined) return;
      this.store.dispatch(getDeckCards({deckId:deckId}))
    }))

    this.subs.push(this.store.select(getDeckIdStudyFromRoute)
    .subscribe((deckId) => {
      if(deckId == undefined) return;
      this.store.dispatch(studyDeck({deckId:deckId}))
    }))
  }

}
