import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from './../../../Models/chapter.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ngrx/appState';
import { Store } from '@ngrx/store';
import * as chapterSelectors from 'src/app/ngrx/chapter/chapter.selectors';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.scss']
})
export class ShowChaptersComponent implements OnInit {

  chapters$: Observable<Chapter[]>;

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
