import { IJourneyModel } from './journey';
import { IRouteLocationModel } from './route-location';
import { ITransportModel } from './transport';

export interface IRouteModel {
  id: number;
  transportId: number;
  transport: ITransportModel;
  journeys: IJourneyModel[];
  routeLocations: IRouteLocationModel[];
}
