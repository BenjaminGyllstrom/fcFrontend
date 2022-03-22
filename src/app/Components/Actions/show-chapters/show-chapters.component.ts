import { ActivatedRoute } from '@angular/router';
import { UrlService } from './../../../Services/url.service';
import { ItemsService } from './../../../Services/items.service';
import { ActionService, Action } from './../../../Services/action.service';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { Chapter } from './../../../Models/chapter.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-chapters',
  templateUrl: './show-chapters.component.html',
  styleUrls: ['./show-chapters.component.scss']
})
export class ShowChaptersComponent implements OnInit, OnDestroy {

  chapters: Chapter[]

  constructor(
    private sideBarService: SideBarService,
    private actionService: ActionService,
    private itemService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute,
  ) { }
  sub:Subscription
  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
  }

  ngOnInit(): void {
    if(this.actionService.action == Action.Default){
      this.actionService.setAction(Action.Chapters)
    }
    this.urlService.handleParams(this.route.snapshot.params);

    this.chapters = this.sideBarService.chapters;
    this.sub = this.sideBarService.chaptersChange.subscribe(()=>{
      this.chapters = this.sideBarService.chapters
    })

  }

  onClick(chapter:Chapter){
    this.sideBarService.setChapter(chapter);
    this.actionService.setAction(Action.Nodes)
  }
}
