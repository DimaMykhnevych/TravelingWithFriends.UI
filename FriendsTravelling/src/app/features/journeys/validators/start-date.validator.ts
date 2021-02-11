import { AbstractControl } from '@angular/forms';

export function StartDateValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let todayDate = new Date();
  let passedDate = new Date(control.value);
  if (passedDate.setHours(0, 0, 0, 0) < todayDate.setHours(0, 0, 0, 0)) {
    return { startDate: true };
  }
  return null;
}
