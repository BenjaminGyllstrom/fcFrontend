import { UrlService } from './../../../Services/url.service';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from './../../../Services/items.service';
import { Chapter, IChapter } from './../../../Models/chapter.model';
import { FormBuilder } from '@angular/forms';
import { SideBarService } from 'src/app/Services/sideBar.service';
import { ChapterHttpService } from './../../../Services/Http/ChapterHttp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private sideBarService: SideBarService,
    private itemsService: ItemsService,
    private urlService: UrlService,
    private route: ActivatedRoute) { }

    chapterForm = this.formBuilder.group({
      title:''
    });

  ngOnInit(): void {
    this.urlService.handleParams(this.route.snapshot.params);
  }


  onSubmit(){
    const title = this.chapterForm.value.title;
    const chapter = new Chapter();
    chapter.title = title;

    if(this.sideBarService.selectedRoot?.id == null)  return

    chapter.rootId = this.sideBarService.selectedRoot?.id;

    this.chapterForm.reset();

    this.itemsService.postChapter(this.sideBarService.selectedRoot, chapter).subscribe()
  }

}
