import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { IRoot, Root } from 'src/app/Models/root.model';
import { HttpService } from 'src/app/features/shared/data-access/Http/http.service';
import { RootHttpService } from 'src/app/features/shared/data-access/Http/RootHttp.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(
    private rootHttpService: RootHttpService,
    private httpService: HttpService,
    private router: Router) { }

  roots: Root[]

  ngOnInit(): void {

    this.getRoots().subscribe((roots: Root[])=>{
      this.roots = roots;
    })

    // if(this.httpService.idToken && this.httpService.idToken != ""){
    //   this.getRoots().subscribe((roots: Root[])=>{
    //     this.roots = roots;
    //   })
    // }
    // this.httpService.idTokenChanged.subscribe(()=>{
    //   this.getRoots().subscribe((roots: Root[])=>{
    //     this.roots = roots;
    //   })
    // })
  }

  getRoots(){
    return this.rootHttpService.getAll().pipe(
      map((IRoots: IRoot[]) => {
        return this.rootHttpService.parseToRoots(IRoots)})
    )
  }

  onClick(root:Root){
    this.router.navigate(['exploreRoot', root.id])
  }
}
