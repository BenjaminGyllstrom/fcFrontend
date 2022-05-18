import { QuillService } from './../../../../Services/quill.service';
import { FormBuilder } from '@angular/forms';
import { Explain } from './../../../../Models/explain.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { getChapterIdFromRoute } from 'src/app/ngrx/chapter/chapter.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { createNode } from 'src/app/ngrx/node/node.actions';

@Component({
  selector: 'app-add-explain',
  templateUrl: './add-explain.component.html',
  styleUrls: ['./add-explain.component.scss']
})
export class AddExplainComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private quillService: QuillService,
    private store: Store<AppState>) { }

  explainForm = this.formBuilder.group({
    title:'',
  });

  chapterId:string;
  quillContent:string = '';
  sub:Subscription
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.sub = this.store.select(getChapterIdFromRoute).pipe(
      tap(chapterId=> this.chapterId = chapterId)
    ).subscribe();
  }

  onContentChange(content:string){
    this.quillContent = content;
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.quillContent;
    const explain = new Explain();
    explain.title = title;
    explain.text = text;
    explain.parentId = this.chapterId;
    this.reset();

    this.store.dispatch(createNode({node:explain}))
  }
  reset(){
    this.explainForm.reset();
    this.quillService.onReset.next();
  }

}
