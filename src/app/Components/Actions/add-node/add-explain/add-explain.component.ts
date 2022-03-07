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

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private quillService: QuillService,
    private sideBarService: SideBarService) { }

  explainForm = this.formBuilder.group({
    title:'',
  });


  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
    if(event.shiftKey && event.key == 'Enter'){
        this.onSubmit();
    }
  }

  @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
  quill:Quill;

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor);
  }

  ngOnInit(): void {
    if(this.sideBarService.selectedChapter == null) return;
    this.chapterId = this.sideBarService.selectedChapter.id;
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.quill.root.innerHTML;
    const explain = new Explain();
    explain.title = title;
    explain.text = text;
    explain.parentId = this.chapterId;
    this.explainForm.reset();
    this.explainHttpService.post(explain).subscribe((eollctedExplain: IExplain) => {
      const newExplain = this.explainHttpService.parseToExplain(eollctedExplain)
      this.sideBarService.addNode(newExplain);

    });
  }


}
