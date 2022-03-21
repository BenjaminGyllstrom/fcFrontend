import { UrlService } from './../../../Services/url.service';
import { ItemsService } from './../../../Services/items.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionService, Action } from './../../../Services/action.service';
import { IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar-roots',
  templateUrl: './side-bar-roots.component.html',
  styleUrls: ['./side-bar-roots.component.scss']
})
export class SideBarRootsComponent implements OnInit, OnDestroy {

  editMode:boolean = true;
  roots: Root[]
  selectedRoot:Root|null;
  addIsClicked:boolean

  constructor(
    private sideBarService: SideBarService,
    private rootHttpService: RootHttpService,
    private actionService: ActionService,
    private dialog: MatDialog,
    private itemsService: ItemsService,
    private urlService: UrlService
    ) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  subs : Subscription = new Subscription();

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    // this.selectRoot(this.sideBarService.selectedRoot)


    const subEditMode = this.sideBarService.editModeChange.subscribe((isEditMode) => this.editMode = isEditMode)
    this.subs.add(subEditMode);

    const subRootChange = this.sideBarService.selectedRootChange.subscribe((root:Root|null)=> {
      this.selectRoot(root)
    })
    this.subs.add(subRootChange);

    const subGetRoots = this.itemsService.getRoots().subscribe((roots:Root[]) => {
      this.roots = roots
      this.sideBarService.setRoots(roots);

      if(this.urlService.rootId) {
        this.itemsService.getRootById(this.urlService.rootId).subscribe((root:Root)=>this.sideBarService.setRoot(root))
      }
    })
    this.subs.add(subGetRoots);
  }

  selectRoot(root: Root|null){
    this.selectedRoot = this.selectedRoot == root? null: root;
    if(this.selectedRoot) this.addIsClicked = false;
  }


  onClick(root:Root|null){
    if(this.selectedRoot == root) root = null;
    this.sideBarService.setRoot(root);
    this.actionService.setAction(root != null? Action.Chapters : Action.MyContentOverview);
  }

  getSideBarItem(root:Root) : ISideBarItem{
    return {icon: 'Root-black.svg', name: root.title}
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    if(this.addIsClicked){
      this.sideBarService.setRoot(null);
      this.actionService.setAction(Action.AddRoot);
      return
    }
    this.actionService.setAction(Action.MyContentOverview);
  }

  onDelete(root:Root){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: root.title, type: 'chapter'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        this.itemsService.deleteRoot(root).subscribe((deletedRoot: Root)=>{
          if(this.sideBarService.selectedRoot?.id == deletedRoot.id)
          this.sideBarService.setRoot(null);
        });
      }
    });
  }
}
