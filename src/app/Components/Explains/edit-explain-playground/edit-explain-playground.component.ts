import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { QuillService } from 'src/app/Services/quill.service';

@Component({
  selector: 'app-edit-explain-playground',
  templateUrl: './edit-explain-playground.component.html',
  styleUrls: ['./edit-explain-playground.component.scss']
})
export class EditExplainPlaygroundComponent implements OnInit {

  @Input('explain') explain: Explain

  explainForm = this.formBuilder.group({
    title:'',
  });

  constructor(
    private formBuilder: FormBuilder,
    private explainHttpService: ExplainHttpService,
    private quillService: QuillService) { }


    @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
    quill:Quill;

    quillContent: string;

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor);

    this.quill.root.innerHTML = this.explain.text;
  }

  ngOnInit(): void {
    this.explainForm = this.formBuilder.group({
      title: this.explain.title,
    })
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.quill.root.innerHTML
    this.explain.title = title;
    this.explain.text = text;

    this.explainHttpService.edit(this.explain, this.explain.id).subscribe((updatedCard: IExplain) => {
    });
  }

}
