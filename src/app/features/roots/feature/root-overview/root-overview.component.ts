import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { QuillService } from 'ngx-quill';
import { Subscription } from 'rxjs';
import { Root } from 'src/app/Models/root.model';
import { AppState } from 'src/app/ngrx/appState';
import { updateRoot } from 'src/app/ngrx/root/root.actions';
import { getRootFromRoute } from 'src/app/ngrx/root/root.selectors';

@Component({
  selector: 'app-root-overview',
  templateUrl: './root-overview.component.html',
  styleUrls: ['./root-overview.component.scss']
})
export class RootOverviewComponent implements OnInit, OnDestroy {

  root:Root;
  edit:boolean;
  content:string
  startValues:{title:string, text: any}

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private quillService: QuillService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  rootForm = this.formBuilder.group({
    title:'',
    description:''
  });

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }
  ngOnInit(): void {
    this.sub = this.store.select(getRootFromRoute).subscribe( root => {
      if(root) {
        this.root = {...root};
        this.rootForm = this.formBuilder.group({
          title: root.title,
          description: root.description
        })

        this.content = root.description;
        this.startValues = {title: root.title, text: root.description};
      }
    })

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
    if(!this.root) return

    this.root.description = this.content;
    this.root.title = this.rootForm.value.title

    this.store.dispatch(updateRoot({root:this.root}))
    this.edit = false
  }
  onCancel(){
    this.edit = false;
    this.content = this.startValues.text;
    this.rootForm = this.formBuilder.group({
      title:this.startValues.title
    });
  }

  onNav(action:string){
    if(action == 'AddChapter'){
      this.router.navigate(['../','Chapters', 'AddChapter'], {relativeTo: this.route})
    }else{
      this.router.navigate(['../',action], {relativeTo: this.route})
    }
  }
}
