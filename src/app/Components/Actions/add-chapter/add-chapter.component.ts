import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../../Services/items.service';
import { Chapter, IChapter } from './../../../Models/chapter.model';
import { FormBuilder } from '@angular/forms';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionService, Action } from 'src/app/Services/action.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as fromChapter from 'src/app/ngrx/chapter/chapter.actions'
import { getRootIdFromRoute } from 'src/app/ngrx/root/root.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
    private sideBarService: SideBarService,
    private itemsService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private actionService: ActionService,
    private store: Store<AppState>) { }

  chapterForm = this.formBuilder.group({
    title:''
  });


  rootId:string;

  sub:Subscription

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.store.select(getRootIdFromRoute).subscribe(rootId=> this.rootId = rootId)
  }


  onSubmit(){
    const title = this.chapterForm.value.title;
    const chapter = new Chapter();
    chapter.title = title;
    chapter.rootId = this.rootId

    if(!this.rootId) return;

    this.chapterForm.reset();
    this.store.dispatch(fromChapter.createChapter({chapter:chapter}))
  }

}
