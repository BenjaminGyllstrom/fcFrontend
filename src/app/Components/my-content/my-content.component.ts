import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/ngrx/appState';
import { getRootChapters } from 'src/app/ngrx/chapter/chapter.actions';
import { getChapterIdFromRoute } from 'src/app/ngrx/chapter/chapter.selectors';
import { getChapterNodes } from 'src/app/ngrx/node/node.actions';
import { getAllRoots } from 'src/app/ngrx/root/root.actions';
import { getRootIdFromRoute } from 'src/app/ngrx/root/root.selectors';

@Component({
  selector: 'app-my-content',
  templateUrl: './my-content.component.html',
  styleUrls: ['./my-content.component.scss'],
  providers: []
})
export class MyContentComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>) { }

  subs:Subscription[] = []
  ngOnDestroy(): void {

    this.subs.forEach(sub =>{
      sub.unsubscribe();
    })
  }

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
      chapterId;
      this.store.dispatch(getChapterNodes({chapterId:chapterId}))
    }))

  }

}
