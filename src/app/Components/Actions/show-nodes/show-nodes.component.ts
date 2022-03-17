import { ItemsService } from './../../../Services/items.service';
import { DisplayTreeService } from './../../../Services/displayTree.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-nodes',
  templateUrl: './show-nodes.component.html',
  styleUrls: ['./show-nodes.component.scss'],
  providers: [DisplayTreeService]
})
export class ShowNodesComponent implements OnInit {

  nodes: any[]

  constructor(
    private sideBarService: SideBarService,
    private displayTreeService: DisplayTreeService,
    private itemsService: ItemsService
  ) { }

  ngOnInit(): void {
    this.itemsService.getNodes(this.itemsService.chapter).subscribe((nodes:any[])=>{
      this.nodes = nodes;
      this.displayTreeService.nodes = this.nodes;
    })
  }

  getColumn(node:any){
    return this.displayTreeService.getColumn(node);
  }
  getRow(node:any){
    return this.displayTreeService.getRow(node);
  }
  getLineColumn(node:any) {
    return this.displayTreeService.getLineColumn(node);
  }
  getLineRow(node:any) {
    return this.displayTreeService.getLineRow(node);
  }
  getLineHeight(node:any){
    return this.displayTreeService.getLineHeight(node);
  }
  getLineWidth(node:any){
    return this.displayTreeService.getLineWidth(node);
  }
  getLineBackground(node:any){
    if(this.sideBarService.editMode) return 'linear-gradient(to right, #BCBCBC, #BCBCBC)'
    return this.displayTreeService.getLineColor(node);
  }

  onClick(node:any){

  }
}
