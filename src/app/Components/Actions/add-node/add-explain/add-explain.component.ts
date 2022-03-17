import { ItemsService } from './../../../../Services/items.service';
import { SideBarService } from './../../../../Services/sideBar.service';
import { ExplainHttpService } from './../../../../Services/Http/ExplainHttp.service';
import { QuillService } from './../../../../Services/quill.service';
import { FormBuilder } from '@angular/forms';
import { Quill } from 'quill';
import { Explain, IExplain } from './../../../../Models/explain.model';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-add-explain',
  templateUrl: './add-explain.component.html',
  styleUrls: ['./add-explain.component.scss']
})
export class AddExplainComponent implements OnInit {


  chapterId:string;
  quillContent:string = '';

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private quillService: QuillService,
    private sideBarService: SideBarService,
    private itemsService: ItemsService) { }

  explainForm = this.formBuilder.group({
    title:'',
  });

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.shiftKey && event.key == 'Enter'){
        this.onSubmit();
    }
  }

  ngOnInit(): void {
    if(this.sideBarService.selectedChapter == null) return;
    this.chapterId = this.sideBarService.selectedChapter.id;
  }

  onContentChange(content:string){
    this.quillContent = content;
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.quillContent;
    const explain = new Explain();
    explain.title = title;
    explain.text = text;
    explain.parentId = this.chapterId;
    this.reset();

    this.itemsService.postExplain(explain).subscribe();
  }
  reset(){
    this.explainForm.reset();
    this.quillService.onReset.next();
  }

}
