import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/Models/chapter.model';
import { ChapterHttpService } from 'src/app/Services/Http/ChapterHttp.service';

@Component({
  selector: 'app-chapter-list-item',
  templateUrl: './chapter-list-item.component.html',
  styleUrls: ['./chapter-list-item.component.scss']
})
export class ChapterListItemComponent implements OnInit {

  @Input() chapter: Chapter
  @Output('onDelete') deleteEmitter : EventEmitter<Chapter> = new EventEmitter<Chapter>();

  expand: boolean = false;

  constructor(private router: Router, private chapterHttpService: ChapterHttpService) { }

  ngOnInit(): void {
  }

  onExpand(){

  }

  onClick(){
    this.router.navigate(['/chapterOverview', this.chapter.id])
  }

  onDelete(){
    this.chapterHttpService.delete(this.chapter.id).subscribe(() => {
      this.deleteEmitter.emit(this.chapter);
    })
  }

  onStudy(){
    this.router.navigate(['/chapterStudy', this.chapter.id])
  }

  onEdit(){
    this.router.navigate(['/chapterOverview', this.chapter.id])
  }
  onPlayground(){
    this.router.navigate(['/chapterPlayground', this.chapter.id])
  }
}
