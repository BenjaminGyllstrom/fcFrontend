import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter } from 'src/app/Models/chapter.model';
import { IRoot, Root } from 'src/app/Models/root.model';
import { RootHttpService } from 'src/app/Services/Http/RootHttp.service';

@Component({
  selector: 'app-root-overview',
  templateUrl: './root-overview.component.html',
  styleUrls: ['./root-overview.component.scss']
})
export class RootOverviewComponent implements OnInit {

  root: Root
  chapters: Chapter[]

  constructor(private route: ActivatedRoute, private router: Router, private rootHttpService: RootHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.rootHttpService.getById(id).subscribe((collectedRoot: IRoot)=> {
      const newRoot = this.rootHttpService.parseToRoot(collectedRoot);
      this.root = newRoot;
      this.chapters = this.root.chapters;
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

  onChapterDelete(chapter : Chapter){
    this.chapters.splice(this.chapters.indexOf(chapter), 1);
  }
}
