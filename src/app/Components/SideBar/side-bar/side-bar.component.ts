import { StateService, State } from './../../../Services/state.service';
import { ActionService } from './../../../Services/action.service';
import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  state:State
  constructor(private sideBarService: SideBarService,
    private actionService: ActionService,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.state = this.stateService.state;
    this.stateService.stateChange.subscribe((state:State) => {
      this.state = state;
    });

    this.sideBarService.initAction();
  }

}
