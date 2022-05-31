import { Explain } from '../../../../Models/explain.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { updateNode } from 'src/app/ngrx/node/node.actions';
import { map, Subscription, tap } from 'rxjs';
import { getNodeFromRoute } from 'src/app/ngrx/node/node.selectors';

@Component({
  selector: 'app-explain-overview',
  templateUrl: './explain-overview.component.html',
  styleUrls: ['./explain-overview.component.scss']
})
export class ExplainOverviewComponent implements OnInit, OnDestroy {

  explain:Explain
  edit:boolean;
  content:string
  startValues:{title:string, text: any}

  explainForm = this.formBuilder.group({
    title:''
  });

  constructor(
    private formBuilder: FormBuilder,
    private store:Store<AppState>
    ) { }

    sub:Subscription
    ngOnDestroy(): void {
      if(this.sub) this.sub.unsubscribe()
    }
  ngOnInit(): void {
    this.sub = this.store.select(getNodeFromRoute).pipe(
      map(node => node?.type == 'explain'? node as Explain: undefined),
    ).subscribe(node => {
      if(node){
        this.explain = {...node};
        this.explainForm = this.formBuilder.group({
          title:this.explain.title
        });
        this.content = this.explain.text
        this.startValues = {title: this.explain.title, text: this.explain.text};
      }
    });
  }

  onQuillClick(){
    this.edit = true;
  }
  onInputChange(){
    this.edit = true;
  }
  onContentChange(content:string){
    this.content = content;
  }

  onSave(){
    if(!this.explain) return

    this.explain.text = this.content;
    this.explain.title = this.explainForm.value.title

    this.store.dispatch(updateNode({node:this.explain}))
    this.edit = false
  }
  onCancel(){
    this.edit = false;
    this.content = this.startValues.text;
    this.explainForm = this.formBuilder.group({
      title:this.startValues.title
    });
  }
}
