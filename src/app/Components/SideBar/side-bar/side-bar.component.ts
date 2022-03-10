import { ActionService } from './../../../Services/action.service';
import { Component, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { SideBarService, State } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  state:State
  constructor(private sideBarService: SideBarService,
    private actionService: ActionService) { }

  ngOnInit(): void {
    this.state = this.sideBarService.state;
    this.sideBarService.stateChange.subscribe((state:State) => {
      this.state = state;
    });

    this.sideBarService.initAction();
  }

}
