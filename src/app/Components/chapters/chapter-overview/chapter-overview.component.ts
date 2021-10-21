import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter, IChapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';

@Component({
  selector: 'app-chapter-overview',
  templateUrl: './chapter-overview.component.html',
  styleUrls: ['./chapter-overview.component.scss']
})
export class ChapterOverviewComponent implements OnInit {

  chapter: Chapter

  constructor(private route: ActivatedRoute, private router: Router, private chapterHttpService: ChapterHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.chapterHttpService.getById(id).subscribe((collectedChapter: IChapter) => {
      this.chapter = this.chapterHttpService.parseToChapter(collectedChapter);
    });
  }

  onCreateDeck(){
    this.router.navigate(['/createDeck/', this.chapter.id])
  }
  onCreateExplain(){
    this.router.navigate(['/createExplain/', this.chapter.id])
  }

  onEdit(){
  }
  onDelete(){
    this.chapterHttpService.delete(this.chapter.id).subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}
