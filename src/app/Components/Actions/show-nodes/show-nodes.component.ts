import { Observable } from 'rxjs';
import { DisplayTreeService } from './../../../Services/displayTree.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as nodeSelectors from 'src/app/ngrx/node/node.selectors'
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-nodes',
  templateUrl: './show-nodes.component.html',
  styleUrls: ['./show-nodes.component.scss'],
  providers: [DisplayTreeService]
})
export class ShowNodesComponent implements OnInit {

  nodes$:Observable<any[]>

  constructor(
    private sideBarService: SideBarService,
    private displayTreeService: DisplayTreeService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.nodes$ = this.store.select(nodeSelectors.getChapterNodesFromRoute).pipe(
      tap((nodes)=>this.displayTreeService.nodes = nodes)
    );
  }
  onClick(node:any){
    let route:any[] = ['']
    if(node.type == 'deck') route = ['Deck', node.id, 'Overview']
    if(node.type == 'explain') route = ['Explain', node.id, 'Overview']

    this.router.navigate(route, {relativeTo: this.route})
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

    return this.displayTreeService.getLineColor(node);
  }
}
