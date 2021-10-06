import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/Models/chapter.model';

@Component({
  selector: 'app-chapter-list-item',
  templateUrl: './chapter-list-item.component.html',
  styleUrls: ['./chapter-list-item.component.scss']
})
export class ChapterListItemComponent implements OnInit {

  @Input() chapter: Chapter

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/chapterOverview', this.chapter.id])
  }
}
