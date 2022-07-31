import { Root } from '../../../../Models/root.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/ngrx/appState';
import { Store } from '@ngrx/store';
import { createRoot } from 'src/app/ngrx/root/root.actions';
import { QuillService } from 'src/app/features/shared/utils/quill.service';


@Component({
  selector: 'app-add-root',
  templateUrl: './add-root.component.html',
  styleUrls: ['./add-root.component.scss']
})
export class AddRootComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private quillService: QuillService) { }

  rootForm = this.formBuilder.group({
    title:'',
    description:''
  });

  quillContent:string = '';

  ngOnInit(): void {
  }

  onSubmit(){
    const title = this.rootForm.value.title;
    const root = new Root();
    root.title = title;
    root.description = this.quillContent;

    this.rootForm.reset();
    this.quillService.onReset.next();

    this.store.dispatch(createRoot({root: root}))
  }

  onContentChange(content:string){
    this.quillContent = content;
  }

}
