import { Observable } from 'rxjs';
import { Root } from './../../../Models/root.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/ngrx/appState';
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
