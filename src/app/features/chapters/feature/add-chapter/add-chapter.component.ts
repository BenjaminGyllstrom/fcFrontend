import { Chapter } from '../../../../Models/chapter.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as fromChapter from 'src/app/ngrx/chapter/chapter.actions'
import { getRootIdFromRoute } from 'src/app/ngrx/root/root.selectors';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit, OnDestroy {

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
) { }

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

  onNav(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
