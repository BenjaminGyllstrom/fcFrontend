import { Chapter } from './../Models/chapter.model';
import { Root } from './../Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';


export enum State {
  Roots,
  Chapters,
  Nodes,
  Deck,
  Explain
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(){}

  state:State = State.Roots;
  stateChange:Subject<State> = new Subject<State>();

  public setState(root: Root|null, chapter: Chapter|null, node:any){
    const startState = this.state
    if (node == null && chapter == null && root == null) {
      this.state = State.Roots;
    }else if (node == null && chapter == null){
      this.state = State.Chapters;
    }
    else if (node == null){
      this.state = State.Nodes;
    }
    else if (node.type == "deck"){
      this.state = State.Deck;
    }
    else if (node.type == "explain"){
      this.state = State.Explain;
    }

    if(startState != this.state){
      this.stateChange.next(this.state);
    }
  }
}
