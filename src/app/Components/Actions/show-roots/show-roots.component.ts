import { ItemsService } from './../../../Services/items.service';
import { Chapter } from 'src/app/Models/chapter.model';
import { ActionService, Action } from './../../../Services/action.service';
import { Root } from './../../../Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-roots',
  templateUrl: './show-roots.component.html',
  styleUrls: ['./show-roots.component.scss']
})
export class ShowRootsComponent implements OnInit {

  roots:Root[]

  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.roots = this.sideBarService.roots
    this.sideBarService.rootsChange.subscribe(()=>this.roots = this.sideBarService.roots)
  }

  onClick(root:Root){
    this.itemsService.root = root;
    this.sideBarService.setRoot(root)
    this.actionService.setAction(Action.Chapters)
  }
}
