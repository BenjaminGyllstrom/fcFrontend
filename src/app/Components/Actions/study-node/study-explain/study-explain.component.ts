import { ExplainHttpService } from './../../../../Services/Http/ExplainHttp.service';
import { Explain, IExplain } from './../../../../Models/explain.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as fromStudy from 'src/app/ngrx/study/study.actions';

@Component({
  selector: 'app-study-explain',
  templateUrl: './study-explain.component.html',
  styleUrls: ['./study-explain.component.scss']
})
export class StudyExplainComponent implements OnInit {

  @Input() explain: Explain
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
  }

  onContinueStudy(){
    this.store.dispatch(fromStudy.setExplainAsRead({explain: this.explain}))
  }
}
