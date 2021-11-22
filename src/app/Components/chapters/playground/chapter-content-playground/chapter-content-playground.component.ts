import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter, IChapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';

@Component({
  selector: 'app-chapter-content-playground',
  templateUrl: './chapter-content-playground.component.html',
  styleUrls: ['./chapter-content-playground.component.scss']
})
export class ChapterContentPlaygroundComponent implements OnInit {

  chapter: Chapter

  nodes: any[]

  constructor(private route: ActivatedRoute, private router: Router, private chapterHttpService: ChapterHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.chapterHttpService.getById(id).subscribe((collectedChapter: IChapter) => {
      this.chapter = this.chapterHttpService.parseToChapter(collectedChapter);
      this.nodes = this.chapter.nodes;
    });
  }
}
