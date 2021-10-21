import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Explain, IExplain } from 'src/app/Models/explain.model';
import { ExplainHttpService } from 'src/app/Services/Http/ExplainHttp.service';

@Component({
  selector: 'app-study-explain',
  templateUrl: './study-explain.component.html',
  styleUrls: ['./study-explain.component.scss']
})
export class StudyExplainComponent implements OnInit {

  explain : Explain

  constructor(private route: ActivatedRoute, private router: Router, private explainHttpService: ExplainHttpService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.explainHttpService.getById(id).subscribe((collectedExplain: IExplain) => {
      this.explain = this.explainHttpService.parseToExplain(collectedExplain);
    });
  }

  onContinueStudy(){

    this.explainHttpService.updateAsRead(this.explain, this.explain.id).subscribe(() => {
      this.router.navigate(['/chapterStudy', this.explain.parentId])
    });

    // if(this.explain.new){
    //   console.log('new');

    //   this.explainHttpService.updateAsRead(this.explain, this.explain.id).subscribe(() => {
    //     this.router.navigate(['/chapterStudy', this.explain.parentId])
    //   });
    // }else{
    //   console.log('notNew');
    //   this.router.navigate(['/chapterStudy', this.explain.parentId])
    // }
  }
}
