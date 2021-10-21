import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';

@Component({
  selector: 'app-edit-explain',
  templateUrl: './edit-explain.component.html',
  styleUrls: ['./edit-explain.component.scss']
})
export class EditExplainComponent implements OnInit {

  explain: Explain

  explainForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private explainHttpService: ExplainHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.explainHttpService.getById(id).subscribe((collectedExplin: IExplain) => {
      const explain = this.explainHttpService.parseToExplain(collectedExplin);

      this.explainForm = this.formBuilder.group({
        title: explain.title,
        text: explain.text
      })

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
