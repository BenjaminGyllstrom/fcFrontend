import { Observable } from 'rxjs';
import { DisplayTreeService } from '../../utils/displayTree.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as nodeSelectors from 'src/app/ngrx/node/node.selectors'
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as fromNode from "src/app/ngrx/node/node.actions";

@Component({
  selector: 'app-show-nodes-rich',
  templateUrl: './show-nodes-rich.component.html',
  styleUrls: ['./show-nodes-rich.component.scss'],
  providers: [DisplayTreeService]
})
export class ShowNodesRichComponent implements OnInit {

  nodes$:Observable<any[]>
  orderMode: boolean = false;
  chapterId:string;

  constructor(
    private displayTreeService: DisplayTreeService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nodes$ = this.store.select(nodeSelectors.getChapterNodesFromRoute).pipe(
      tap((nodes)=>{
        this.displayTreeService.nodes = nodes

        if(nodes.length > 0){
          this.chapterId = nodes[0].parentId;
        }
      })
    );
  }

  onClick(node:any){
    let route:any[] = ['']
    if(node.type == 'deck') route = ['Deck', node.id, 'Overview']
    if(node.type == 'explain') route = ['Explain', node.id, 'Overview']

    this.router.navigate(route, {relativeTo: this.route})
  }

  drop(event: CdkDragDrop<any[]>){
    if(!this.orderMode) return;

    if(this.chapterId)
      this.store.dispatch(fromNode.changeNodeOrder({chapterId: this.chapterId, oldIndex: event.previousIndex, newIndex: event.currentIndex}))
  }

  onNav(action:string){
    this.router.navigate([action], {relativeTo: this.route})
  }
}
