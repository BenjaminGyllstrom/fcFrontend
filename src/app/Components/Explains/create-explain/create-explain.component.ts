import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';
import { QuillService } from 'src/app/Services/quill.service';

@Component({
  selector: 'app-create-explain',
  templateUrl: './create-explain.component.html',
  styleUrls: ['./create-explain.component.scss']
})
export class CreateExplainComponent implements OnInit, AfterViewInit {

  parentId:string;

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private quillService: QuillService) { }

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
    const id = this.route.snapshot.params['id'];
    this.parentId = id;
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.quill.root.innerHTML;
    const explain = new Explain();
    explain.title = title;
    explain.text = text;
    explain.parentId = this.parentId;
    this.explainForm.reset();
    this.explainHttpService.post(explain).subscribe((newExplain: IExplain) => {
      this.router.navigate(['/explainOverview', newExplain._id])
    });
  }

}
