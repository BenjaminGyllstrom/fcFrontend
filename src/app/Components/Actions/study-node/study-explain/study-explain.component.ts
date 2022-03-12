import { ExplainHttpService } from './../../../../Services/Http/ExplainHttp.service';
import { Explain, IExplain } from './../../../../Models/explain.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-study-explain',
  templateUrl: './study-explain.component.html',
  styleUrls: ['./study-explain.component.scss']
})
export class StudyExplainComponent implements OnInit {

  @Input() explain: Explain
  @Output('finnished') finnishedEmitter = new EventEmitter<Explain>()
  constructor(
    private explainHttpService: ExplainHttpService
  ) { }

  ngOnInit(): void {
  }

  onContinueStudy(){

    this.explainHttpService.updateAsRead(this.explain, this.explain.id).subscribe((updatedIExplain: IExplain) => {
      const explain = this.explainHttpService.parseToExplain(updatedIExplain);
      this.finnishedEmitter.emit(explain);
    });
  }

}
