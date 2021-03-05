import { IRouteModel } from './route';

export interface ITransportModel {
  id: number;
  name: string;
  description: string;
  routes: IRouteModel[];
}
