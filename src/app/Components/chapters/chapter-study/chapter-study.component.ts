import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter, IChapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';

@Component({
  selector: 'app-chapter-study',
  templateUrl: './chapter-study.component.html',
  styleUrls: ['./chapter-study.component.scss']
})
// export class ChapterStudyComponent implements OnInit, AfteViewInit {
export class ChapterStudyComponent implements OnInit {

  chapter: Chapter;

  constructor(private route: ActivatedRoute, private chapterHttpService: ChapterHttpService) { }

  // startX = 0;
  // startY = 0;
  // endX = 0;
  // endY = 0;

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.chapterHttpService.getById(id).subscribe((collectedChapter: IChapter) => {
      this.chapter = this.chapterHttpService.parseToChapter(collectedChapter);
    });


  }
  // ngAfterViewInit() {

  //   setTimeout(() => {
  //     const z1 = document.getElementById('Node1')
  //     console.log(z1);

  //     const startElement = document.getElementById('Node1')
  //     const endElement = document.getElementById('Node2')


  //     // const startElement = document.querySelector('#start');
  //     // const endElement = document.querySelector('#end');
  //     console.log(startElement);
  //     console.log(endElement);


  //     // if(startElement != null && endElement != null){
  //     //   const startRect = startElement.getBoundingClientRect();
  //     //   const endRect = endElement.getBoundingClientRect();

  //     //   this.startX = startRect.right;
  //     //   this.startY = startRect.top;
  //     //   this.endX = endRect.left;
  //     //   this.endY = endRect.bottom;
  //     // }
  //   });
  // }
}
