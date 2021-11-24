import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chapter, IChapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';
import { PlaygroundService } from 'src/app/Services/playground.service';

@Component({
  selector: 'app-chapter-content-playground',
  templateUrl: './chapter-content-playground.component.html',
  styleUrls: ['./chapter-content-playground.component.scss']
})
export class ChapterContentPlaygroundComponent implements OnInit {

  chapter: Chapter
  chapterId: string;
  nodes: any[]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chapterHttpService: ChapterHttpService,
    private playgroundService: PlaygroundService
    ) { }

  ngOnInit(): void {
    this.chapterId = this.route.snapshot.params['id'];

    this.playgroundService.resetPlayground();

    this.chapterHttpService.getById(this.chapterId).subscribe((collectedChapter: IChapter) => {
      this.chapter = this.chapterHttpService.parseToChapter(collectedChapter);
      this.nodes = this.chapter.nodes;
    });
  }
}
