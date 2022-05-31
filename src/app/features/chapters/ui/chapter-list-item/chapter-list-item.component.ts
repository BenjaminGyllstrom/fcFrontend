import { Chapter } from '../../../../Models/chapter.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-list-item',
  templateUrl: './chapter-list-item.component.html',
  styleUrls: ['./chapter-list-item.component.scss']
})
export class ChapterListItemComponent implements OnInit {

  @Input() chapter: Chapter

  constructor() { }

  ngOnInit(): void {
  }

}
