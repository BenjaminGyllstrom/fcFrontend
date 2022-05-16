import { Observable, Subscription } from 'rxjs';
import { ItemsService } from './../../../Services/items.service';
import { ActionService, Action } from './../../../Services/action.service';
import { Root } from './../../../Models/root.model';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/Services/url.service';
import { Store } from '@ngrx/store';
import { AppState, RootState } from 'src/app/ngrx/appState';
import { getAllRoots } from 'src/app/ngrx/root/root.actions';
import { getRoots } from 'src/app/ngrx/root/root.selectors';


@Component({
  selector: 'app-show-roots',
  templateUrl: './show-roots.component.html',
  styleUrls: ['./show-roots.component.scss']
})
export class ShowRootsComponent implements OnInit {

  roots$ : Observable<Root[]>

  constructor(
    private router: Router,
    private store: Store<AppState>
  ){}

  ngOnInit(): void {
    this.roots$ = this.store.select(getRoots);
  }

  onClick(root:Root){
    this.router.navigate(['/myContent/Roots', root.id, 'Chapters'])
  }
}
