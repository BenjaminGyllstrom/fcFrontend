import { Component, OnInit } from '@angular/core';
import { IRoot, Root } from 'src/app/Models/root.model';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';


@Component({
  selector: 'app-my-roots',
  templateUrl: './my-roots.component.html',
  styleUrls: ['./my-roots.component.scss']
})
export class MyRootsComponent implements OnInit {

  roots: Root[]

  constructor(private rootHttpService: RootHttpService) { }

  ngOnInit(): void {
    this.rootHttpService.get().subscribe((collectedRoots: IRoot[]) => {
      const roots = this.rootHttpService.parseToRoots(collectedRoots);
      this.roots = roots
    });
  }

}
