import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IJourneyModel } from 'src/app/core/models/journey';

export function AvailablePlacesValidator(
  journey: IJourneyModel,
  wasJourneyRequested: boolean
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (journey === null) return null;
    else if (journey !== null && wasJourneyRequested) {
      if (control.value < journey.availablePlaces) {
        return { wrongAvailablePlaces: true };
      }
    }
    return null;
  };
}
