import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Chapter } from 'src/app/Models/chapter.model';
import { AppState } from 'src/app/ngrx/appState';
import { updateChapter } from 'src/app/ngrx/chapter/chapter.actions';
import { getChapterFromRoute } from 'src/app/ngrx/chapter/chapter.selectors';

@Component({
  selector: 'app-chapter-overview',
  templateUrl: './chapter-overview.component.html',
  styleUrls: ['./chapter-overview.component.scss']
})
export class ChapterOverviewComponent implements OnInit, OnDestroy {

  chapter:Chapter;
  edit:boolean;
  content:string
  startValues:{title:string}

  constructor(    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
) { }

  chapterForm = this.formBuilder.group({
    title:'',
  });

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }
  ngOnInit(): void {
    this.sub = this.store.select(getChapterFromRoute).subscribe(chapter => {
      if(chapter){
        this.chapter = {...chapter};
        this.chapterForm = this.formBuilder.group({
          title: chapter.title
        })
        this.startValues = {title: chapter.title};
      }
    })
  }
  onInputChange(){
    this.edit = true;
  }
  onSave(){
    if(!this.chapter) return

    this.chapter.title = this.chapterForm.value.title

    this.store.dispatch(updateChapter({chapter:this.chapter}))
    this.edit = false
  }
  onCancel(){
    this.edit = false;
    this.chapterForm = this.formBuilder.group({
      title:this.startValues.title
    });
  }

  onNav(action:string){
    if(action == 'AddNode'){
      this.router.navigate(['../','Nodes', 'AddNode'], {relativeTo: this.route})
    }else{
      this.router.navigate(['../',action], {relativeTo: this.route})
    }
  }
}
