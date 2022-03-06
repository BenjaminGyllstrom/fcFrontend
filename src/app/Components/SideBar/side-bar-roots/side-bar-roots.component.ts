import { IRoot } from './../../../Models/root.model';
import { RootHttpService } from './../../../Services/Http/RootHttp.service';
import { Component, Input, OnInit } from '@angular/core';
import { Root } from 'src/app/Models/root.model';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { Action, SideBarService } from 'src/app/Services/sideBar.service';

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
    private rootHttpService: RootHttpService) { }

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

    this.sideBarService.requestRoots();
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

  onClick(root:Root){
    this.selectRoot(root);
    this.sideBarService.setRoot(this.selectedRoot);
  }

  getSideBarItem(root:Root) : ISideBarItem{
    return {icon: 'Explain-black.svg', name: root.title}
  }

  shouldShow(root:Root){
    if(this.showAll) return true;
    if(this.selectedRoot === root) return true;
    return false;
  }

  onAdd(){
    this.addIsClicked = !this.addIsClicked;
    this.selectedRoot = null;

    const setAction = !this.addIsClicked
    this.sideBarService.setChapter(this.selectedRoot, setAction);

    if(this.addIsClicked){
      this.sideBarService.setAction(Action.AddRoot);
    }
  }
}
