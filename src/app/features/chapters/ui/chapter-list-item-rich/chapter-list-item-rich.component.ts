import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter.model';

@Component({
  selector: 'app-chapter-list-item-rich',
  templateUrl: './chapter-list-item-rich.component.html',
  styleUrls: ['./chapter-list-item-rich.component.scss']
})
export class ChapterListItemRichComponent implements OnInit {

  @Input() chapter: Chapter

  constructor() { }

  ngOnInit(): void {
  }

}
