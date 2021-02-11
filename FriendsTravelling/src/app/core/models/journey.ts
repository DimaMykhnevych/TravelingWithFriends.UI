import { IRouteModel } from './route';
import { IUserJourneysModel } from './user-journey';

export interface IJourneyModel {
  id: number;
  startDate: Date;
  endDate: Date;
  price: number;
  description: number;
  minimumRequiredAge: number;
  maximumRequiredAge: number;
  organizerId: number;
  availablePlaces: number;
  routeId: number;
  route: IRouteModel;
  userJourneys: IUserJourneysModel[];
}
