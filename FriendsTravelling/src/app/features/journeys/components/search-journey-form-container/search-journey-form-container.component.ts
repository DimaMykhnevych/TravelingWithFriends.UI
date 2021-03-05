import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ISearchJourneyModel } from 'src/app/core/models/search-journey';
import { SearchJourneyFormComponent } from '../search-journey-form/search-journey-form.component';

@Component({
  selector: 'app-search-journey-form-container',
  templateUrl: './search-journey-form-container.component.html',
  styleUrls: ['./search-journey-form-container.component.scss'],
})
export class SearchJourneyFormContainerComponent implements OnInit {
  @Output()
  public onJourneySearch: EventEmitter<ISearchJourneyModel> = new EventEmitter<ISearchJourneyModel>();
  @ViewChild('searchJourneyForm')
  searchJourneyForm: SearchJourneyFormComponent;
  constructor() {}

  public ngOnInit(): void {}

  public onSubmitClick(): void {
    this.onJourneySearch.emit(this.searchJourneyForm.form.value);
  }

  public onClearClick(): void {
    this.searchJourneyForm.clearInputFields();
    this.onJourneySearch.emit(this.searchJourneyForm.form.value);
  }
}
