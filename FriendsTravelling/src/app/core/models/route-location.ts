import { ILocationModel } from './location';
import { IRouteModel } from './route';

export interface IRouteLocationModel {
  id: number;
  routeId: number;
  locationId: number;
  locationOrder: number;

  route: IRouteModel;
  location: ILocationModel;
}
