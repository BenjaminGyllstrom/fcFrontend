import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, range, tap } from 'rxjs';
import { AppState } from 'src/app/ngrx/appState';
import * as nodeSelectors from 'src/app/ngrx/node/node.selectors'


@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit {

  _nodes: any[]
  @Input() set nodes(nodes:any[]){
    this._nodes = nodes;
    this.rows = this.createRows(nodes)
  }
  @Input() useDefaultBackground:boolean = false
  @Input() rowLength: number = 3;
  @Output('Clicked') clickEmitter = new EventEmitter<any>();
  nodes$: Observable<any[]>;
  rows: any[] = []


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  createRows(nodes: any[]){
    const rows:any[] = []
    if(nodes && nodes.length > 0){
      for (let i = 0; i < nodes.length; i+=this.rowLength) {
        const row = [...nodes.slice(i,i+this.rowLength)];

        if(row && row.length > 0){
          rows.push(row);
        }
      }
    }
    return rows
  }

  onClick(node:any){
    this.clickEmitter.emit(node);
  }
}
