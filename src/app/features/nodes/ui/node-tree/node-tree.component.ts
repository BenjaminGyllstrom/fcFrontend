import { Component, Input, OnInit } from '@angular/core';
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

  @Input() rowLength: number = 3;
  nodes$: Observable<any[]>;
  rows: any[] = []


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.nodes$ = this.store.select(nodeSelectors.getChapterNodesFromRoute).pipe(
      tap(nodes => {
        if(nodes && nodes.length > 0){
          for (let i = 0; i < nodes.length; i+=this.rowLength) {
            const row = [...nodes.slice(i,i+this.rowLength)];

            if(row && row.length > 0){
              this.rows.push(row);
            }
          }
        }
      })
    )
  }
}
