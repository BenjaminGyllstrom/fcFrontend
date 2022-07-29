import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IRoot, Root } from 'src/app/Models/root.model';
import { HttpService } from 'src/app/features/shared/data-access/Http/http.service';
import { RootHttpService } from 'src/app/features/shared/data-access/Http/RootHttp.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
import * as fromExplore from "src/app/ngrx/explore/explore.actions";
import { getRoots } from 'src/app/ngrx/explore/explore.selectors';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<AppState>
    ) { }

  roots: Root[]

  roots$: Observable<Root[]>;

  ngOnInit(): void {

    this.store.dispatch(fromExplore.getRoots());

    this.roots$ = this.store.select(getRoots);
  }

  onClick(root:Root){
    this.router.navigate(['exploreRoot', root.id])
  }
}
