import { Subscription } from 'rxjs';
import { ItemsService } from './../../../Services/items.service';
import { DisplayTreeService } from './../../../Services/displayTree.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-show-nodes',
  templateUrl: './show-nodes.component.html',
  styleUrls: ['./show-nodes.component.scss'],
  providers: [DisplayTreeService]
})
export class ShowNodesComponent implements OnInit, OnDestroy {

  nodes: any[]

  constructor(
    private sideBarService: SideBarService,
    private displayTreeService: DisplayTreeService,
    private itemsService: ItemsService
  ) { }

  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.nodes = this.sideBarService.nodes
    this.displayTreeService.nodes = this.nodes;

    this.sub = this.sideBarService.nodesChange.subscribe(()=> {
      this.nodes = this.sideBarService.nodes
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
    console.log(node);

    this.sideBarService.setNode(node);
  }
}
