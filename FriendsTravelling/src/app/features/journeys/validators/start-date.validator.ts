import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IJourneyModel } from 'src/app/core/models/journey';

export function StartDateValidator(journey: IJourneyModel): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (journey != null) return null;
    let todayDate = new Date();
    let passedDate = new Date(control.value);
    if (passedDate.setHours(0, 0, 0, 0) < todayDate.setHours(0, 0, 0, 0)) {
      return { startDate: true };
    }
    return null;
  };
}
