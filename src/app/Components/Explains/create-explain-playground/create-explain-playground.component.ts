import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { PlaygroundService } from 'src/app/Services/playground.service';
import { QuillService } from 'src/app/Services/quill.service';

@Component({
  selector: 'app-create-explain-playground',
  templateUrl: './create-explain-playground.component.html',
  styleUrls: ['./create-explain-playground.component.scss']
})
export class CreateExplainPlaygroundComponent implements OnInit {


  @Input('chapterId') chapterId:string;

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quillService: QuillService,
    private playgroundService: PlaygroundService) { }

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
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.quill.root.innerHTML;
    const explain = new Explain();
    explain.title = title;
    explain.text = text;
    explain.parentId = this.chapterId;
    this.explainForm.reset();
    this.explainHttpService.post(explain).subscribe((newExplain: IExplain) => {
      const explain = this.explainHttpService.parseToExplain(newExplain)
      this.playgroundService.createdExplain.next(explain);
      this.resetQuill();
    });
  }

  resetQuill() {
    this.quill.root.innerHTML = ''
  }
}
