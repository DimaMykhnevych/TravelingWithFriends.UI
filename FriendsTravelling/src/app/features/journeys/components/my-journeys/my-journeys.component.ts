import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { IJourneyModel } from 'src/app/core/models/journey';
import { MyJourneysService } from '../../services/my-journeys.service';

@Component({
  selector: 'app-my-journeys',
  templateUrl: './my-journeys.component.html',
  styleUrls: ['./my-journeys.component.scss'],
})
export class MyJourneysComponent implements OnInit {
  public currentUserJourneys: IJourneyModel[] = [];
  public isLoading: boolean = true;
  constructor(
    private _myJourneysService: MyJourneysService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserJourneys();
  }

  public onJourneyEdit(journeyId: number) {
    this.router.navigate(['/profile/journeys'], {
      queryParams: {
        journeyId: journeyId,
      },
    });
  }

  public onJourneyDelete(journeyId: number) {
    this._myJourneysService
      .deleteUserJourney(journeyId)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this._toastr.success('Your journey was deleted successfully');
        this.getUserJourneys();
      });
  }

  private getUserJourneys(): void {
    this._myJourneysService.getCurrentUserJourneys().subscribe((resp) => {
      if (resp) {
        this.currentUserJourneys = resp;
        this.isLoading = false;
      }
    });
  }
}
