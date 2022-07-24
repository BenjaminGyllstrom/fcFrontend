import { Observable } from 'rxjs';
import { DisplayTreeService } from '../../utils/displayTree.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as nodeSelectors from 'src/app/ngrx/node/node.selectors'
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-nodes-rich',
  templateUrl: './show-nodes-rich.component.html',
  styleUrls: ['./show-nodes-rich.component.scss'],
  providers: [DisplayTreeService]
})
export class ShowNodesRichComponent implements OnInit {

  nodes$:Observable<any[]>

  constructor(
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
}
