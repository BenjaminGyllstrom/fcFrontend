import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from './../../../Services/url.service';
import { ItemsService } from './../../../Services/items.service';
import { ActionService, Action } from './../../../Services/action.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Chapter } from './../../../Models/chapter.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/ngrx/appState';
import { Store } from '@ngrx/store';
import { getRootFromRoute, getRootIdFromRoute } from 'src/app/ngrx/root/root.selectors';
import { getRootChapters } from 'src/app/ngrx/chapter/chapter.actions';
import * as fromChapters from 'src/app/ngrx/chapter/chapter.actions';
import * as chapterSelectors from 'src/app/ngrx/chapter/chapter.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.scss']
})
export class ShowChaptersComponent implements OnInit {

  chapters$: Observable<Chapter[]>;

  rootId:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.chapters$ = this.store.select(chapterSelectors.getRootChaptersFromRoute);
  }

  onClick(chapter:Chapter){
    this.router.navigate([chapter.id, 'Nodes'], {relativeTo: this.route})
  }
}
