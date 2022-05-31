import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import { getNodeFromRoute } from 'src/app/ngrx/node/node.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-study-node',
  templateUrl: './study-node.component.html',
  styleUrls: ['./study-node.component.scss']
})
export class StudyNodeComponent implements OnInit, OnDestroy {

  // deck:Deck|undefined
  // cards:Card[]|undefined

  // explain:Explain|undefined

  finnished:boolean;

  constructor(
    private store: Store<AppState>) { }

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }
  node$ :Observable<any>
  ngOnInit(): void {

    this.node$ = this.store.select(getNodeFromRoute)
  }

  checkFinnished(node:any){
    if(node.type == 'deck') {
      this.finnished = node.finnished
    }
    else if(node.type == 'explain') {
      this.finnished =  !node.new
    }
  }

  onExplainFinnished(){
    this.finnished = true;
  }

}
