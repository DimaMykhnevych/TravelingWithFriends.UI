import { IRouteLocationModel } from './route-location';

export interface ILocationModel {
  id: number;
  name: string;
  longtitude: string;
  latitude: string;
  country: string;
  routeLocations: IRouteLocationModel[];
}
