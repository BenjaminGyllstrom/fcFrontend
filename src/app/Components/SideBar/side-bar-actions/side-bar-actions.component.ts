import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService, State } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar-actions',
  templateUrl: './side-bar-actions.component.html',
  styleUrls: ['./side-bar-actions.component.scss']
})
export class SideBarActionsComponent implements OnInit {

  state:State
  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.state = this.sideBarService.state;
    this.sideBarService.stateChange.subscribe((state:State) => {
      this.state = state;
    });
  }

  isRootsState(){return this.state == State.Roots}
  isChaptersState(){return this.state == State.Chapters}
  isNodesState(){return this.state == State.Nodes}
  isDeckState(){return this.state == State.Deck}
  isExplainState(){return this.state == State.Explain}

}
