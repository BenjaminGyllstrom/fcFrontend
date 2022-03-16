import { MatDialog } from '@angular/material/dialog';
import { ActionService, Action } from './../../../Services/action.service';
import { IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';

@Component({
  selector: 'app-side-bar-roots',
  templateUrl: './side-bar-roots.component.html',
  styleUrls: ['./side-bar-roots.component.scss']
})
export class SideBarRootsComponent implements OnInit {

  editMode:boolean = true;
  roots: Root[]
  selectedRoot:Root|null;
  showAll:boolean = true;
  addIsClicked:boolean

  constructor(
    private sideBarService: SideBarService,
    private rootHttpService: RootHttpService,
    private actionService: ActionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;

    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })

    this.sideBarService.rootsUpdated.subscribe(()=>{
      this.roots = this.sideBarService.roots;
    })

    this.sideBarService.selectedRootChange.subscribe((root:Root|null)=>{
      this.selectRoot(root);
    })

    if(this.sideBarService.selectedRoot != null){
      this.selectRoot(this.sideBarService.selectedRoot)
    }
    if(this.sideBarService.roots.length == 0) {
      this.sideBarService.requestRoots();
    }else{
      this.roots = this.sideBarService.roots
    }
  }

  selectRoot(root: Root|null){
    if(root == null || this.selectedRoot == root){
      this.selectedRoot = null
      this.showAll = true;
    }else{
      this.selectedRoot = root;
      this.showAll = false;
      this.addIsClicked = false;
    }
  }

  onClick(root:Root|null){
    if(this.selectedRoot == root) root = null;
    this.sideBarService.setRoot(root);
    this.actionService.setAction(root != null? Action.Chapters : Action.MyContentOverview);
  }

  getSideBarItem(root:Root) : ISideBarItem{
    return {icon: 'Root-black.svg', name: root.title}
  }

  shouldShow(root:Root){
    if(this.showAll) return true;
    if(this.selectedRoot === root) return true;
    return false;
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    if(this.addIsClicked){
      this.sideBarService.setRoot(null);
      this.actionService.setAction(Action.AddRoot);
    }else{
      this.actionService.setAction(Action.MyContentOverview);
    }

  }

  onDelete(root:Root){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: {name: root.title, type: 'chapter'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 'Delete'){
        this.rootHttpService.delete(root.id).subscribe((deletedIRoot:IRoot)=>{
          this.sideBarService.deleteRoot(deletedIRoot);
        })
      }
    });
  }
}
