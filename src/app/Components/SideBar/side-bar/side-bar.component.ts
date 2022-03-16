import { Chapter } from 'src/app/Models/chapter.model';
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

    root:Root|null
    chapter:Chapter|null
    node:any

  ngOnInit(): void {
    this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    this.sideBarService.selectedRootChange.subscribe((root: Root|null)=>{
      this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    })
    this.sideBarService.selectedChapterChange.subscribe((chapter: Chapter|null)=>{
      this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    })
    this.sideBarService.selectedNodeChange.subscribe((node: any)=>{
      this.state = this.stateService.setState(this.sideBarService.selectedRoot, this.sideBarService.selectedChapter, this.sideBarService.selectedNode)
    })

    this.sideBarService.initAction();
  }


}
