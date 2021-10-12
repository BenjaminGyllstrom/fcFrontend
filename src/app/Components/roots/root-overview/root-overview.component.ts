import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoot, Root } from 'src/app/Models/root.model';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';

@Component({
  selector: 'app-root-overview',
  templateUrl: './root-overview.component.html',
  styleUrls: ['./root-overview.component.scss']
})
export class RootOverviewComponent implements OnInit {

  root: Root

  constructor(private route: ActivatedRoute, private router: Router, private rootHttpService: RootHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rootHttpService.getById(id).subscribe((collectedRoot: IRoot)=> {
      const newRoot = this.rootHttpService.parseToRoot(collectedRoot);
      this.root = newRoot;
    });
  }

  onCreateChapter(){
    this.router.navigate(['/createChapter/', this.root.id])
  }

  onEdit(){

  }
  onDelete(){
    this.rootHttpService.delete(this.root.id).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
