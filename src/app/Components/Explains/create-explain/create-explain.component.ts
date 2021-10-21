import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Explain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';

@Component({
  selector: 'app-create-explain',
  templateUrl: './create-explain.component.html',
  styleUrls: ['./create-explain.component.scss']
})
export class CreateExplainComponent implements OnInit {

  parentId:string;

  constructor(
    private explainHttpService: ExplainHttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  explainForm = this.formBuilder.group({
    title:'',
    text:''
  });


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.parentId = id;
  }

  onSubmit(){
    const title = this.explainForm.value.title;
    const text = this.explainForm.value.text;
    const explain = new Explain();
    explain.title = title;
    explain.text = text;
    explain.parentId = this.parentId;
    this.explainForm.reset();
    this.explainHttpService.post(explain).subscribe();
  }

}
