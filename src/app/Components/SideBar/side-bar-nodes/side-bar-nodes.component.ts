import { Component, Input, OnInit } from '@angular/core';
import { ISideBarItem } from 'src/app/Models/sideBarItem';
import { SideBarService } from 'src/app/Services/sideBar.service';

@Component({
  selector: 'app-side-bar-nodes',
  templateUrl: './side-bar-nodes.component.html',
  styleUrls: ['./side-bar-nodes.component.scss']
})
export class SideBarNodesComponent implements OnInit {
  editMode:boolean = true;
  nodes: any[]
  selectedNode:any|null;

  constructor(private sideBarService: SideBarService) { }

  ngOnInit(): void {
    this.editMode = this.sideBarService.editMode;
    this.nodes = this.sideBarService.getNodes();

    this.sideBarService.editModeChange.subscribe((isEditMode) => {
      this.editMode = isEditMode;
    })
  }

  onClick(node:any){
    if(this.selectedNode == node){
      this.selectedNode = null
    }else{
      this.selectedNode = node;
    }
    this.sideBarService.setNode(this.selectedNode);
  }

  getSideBarItem(root:any) : ISideBarItem{
    return {icon: 'Explain-black.svg', name: root.title}
  }

  onAdd(){

  }

}
