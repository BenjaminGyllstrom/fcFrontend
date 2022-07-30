import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/Models/chapter.model';

@Component({
  selector: 'app-explore-chapter-item',
  templateUrl: './explore-chapter-item.component.html',
  styleUrls: ['./explore-chapter-item.component.scss']
})
export class ExploreChapterItemComponent implements OnInit {

  @Input() chapter: Chapter

  constructor() { }

  ngOnInit(): void {
  }

}
