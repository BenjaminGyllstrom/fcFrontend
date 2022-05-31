import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DisplayTreeService } from 'src/app/features/nodes/utils/displayTree.service';

@Component({
  selector: 'app-nodes-root-overview',
  templateUrl: './nodes-root-overview.component.html',
  styleUrls: ['./nodes-root-overview.component.scss'],
  providers: [DisplayTreeService]
})
export class NodesRootOverviewComponent implements OnInit {

  _nodes: any[]
  @Input() set nodes(nodes:any[]){
    this._nodes = nodes;
    this.displayTreeService.nodes = nodes;
  }

  @Output('onNodeClick') onNodeClickEmitter = new EventEmitter<any>();

  // @Input() set nodes: any[]

  constructor(private displayTreeService: DisplayTreeService) { }

  ngOnInit(): void {
    // this.displayTreeService.nodes = this.nodes;
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
    return 'linear-gradient(to right, #BCBCBC, #BCBCBC)'
  }

  onClick(node:any){
    this.onNodeClickEmitter.emit(node);
  }

}
