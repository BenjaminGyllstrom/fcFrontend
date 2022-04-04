import { Subscription } from 'rxjs';
import { ItemsService } from './../../../Services/items.service';
import { ActionService, Action } from './../../../Services/action.service';
import { Root } from './../../../Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/Services/url.service';

@Component({
  selector: 'app-show-roots',
  templateUrl: './show-roots.component.html',
  styleUrls: ['./show-roots.component.scss']
})
export class ShowRootsComponent implements OnInit, OnDestroy {

  roots:Root[]

  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private itemsService: ItemsService,
    private router: Router,
    private urlService: UrlService
  ) { }

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.roots = this.sideBarService.roots
    this.sub = this.sideBarService.rootsChange.subscribe(()=>this.roots = this.sideBarService.roots)
  }

  onClick(root:Root){
    this.sideBarService.setRoot(root)
    this.actionService.setAction(Action.Chapters)
    this.navigate(Action.Chapters)
  }

  navigate(action:Action, nodeType:string = ''){
    this.router.navigate(this.urlService.getPath(action, this.sideBarService.selectedRoot?.id,
      this.sideBarService.selectedChapter?.id, this.sideBarService.selectedNode?.id, nodeType))
  }
}
