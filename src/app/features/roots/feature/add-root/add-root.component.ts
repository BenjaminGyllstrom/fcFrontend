import { Root } from '../../../../Models/root.model';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/ngrx/appState';
import { Store } from '@ngrx/store';
import { createRoot } from 'src/app/ngrx/root/root.actions';


@Component({
  selector: 'app-add-root',
  templateUrl: './add-root.component.html',
  styleUrls: ['./add-root.component.scss']
})
export class AddRootComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>) { }

  rootForm = this.formBuilder.group({
    title:''
  });

  ngOnInit(): void {
  }

  onSubmit(){
    const title = this.rootForm.value.title;
    const root = new Root();
    root.title = title;

    this.rootForm.reset();

    this.store.dispatch(createRoot({root: root}))
  }

}
