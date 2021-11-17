import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { QuillService } from 'src/app/Services/quill.service';

@Component({
  selector: 'app-edit-explain',
  templateUrl: './edit-explain.component.html',
  styleUrls: ['./edit-explain.component.scss']
})
export class EditExplainComponent implements OnInit, AfterViewInit {

  explain: Explain

  explainForm = this.formBuilder.group({
    title:'',
  });

  constructor(
    private route:
    ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private explainHttpService: ExplainHttpService,
    private quillService: QuillService) { }


    @ViewChild('editor', { read: ElementRef, static: false }) editor: ElementRef
    quill:Quill;

    quillContent: string;

  ngAfterViewInit(){
    this.quill = this.quillService.createQuill(this.editor);

    if(this.quillContent){
      this.quill.root.innerHTML = this.quillContent;
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.explainHttpService.getById(id).subscribe((collectedExplin: IExplain) => {
      const explain = this.explainHttpService.parseToExplain(collectedExplin);

      this.explainForm = this.formBuilder.group({
        title: explain.title,
      })

      if(this.quill){
        this.quill.root.innerHTML = explain.text;
      }

      this.explain = explain;
    })
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.explainForm.value.text;
    this.explain.title = title;
    this.explain.text = text;

    this.explainHttpService.edit(this.explain, this.explain.id).subscribe((updatedCard: IExplain) => {
      const explain = this.explainHttpService.parseToExplain(updatedCard);
      console.log(explain);

      this.router.navigate(['/explainOverview', explain.id]);
    });
  }
}
