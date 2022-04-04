import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { IRoot, Root } from 'src/app/Models/root.model';
import { HttpService } from 'src/app/Services/Http/http.service';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(private rootHttpService: RootHttpService, private httpService: HttpService) { }

  roots: Root[]

  ngOnInit(): void {

    if(this.httpService.idToken && this.httpService.idToken != ""){
      this.getRoots().subscribe((roots: Root[])=>{
        this.roots = roots;
      })
    }
    this.httpService.idTokenChanged.subscribe(()=>{
      this.getRoots().subscribe((roots: Root[])=>{
        this.roots = roots;
      })
    })
  }

  getRoots(){
    return this.rootHttpService.getAll().pipe(
      tap((IRoots: IRoot[]) => {
        console.log(IRoots);
      }),
      map((IRoots: IRoot[]) => {
        return this.rootHttpService.parseToRoots(IRoots)})
    )
  }

}
