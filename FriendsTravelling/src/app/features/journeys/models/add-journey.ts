import { IJourney } from './journey';
import { ILocation } from './location';
import { ITransport } from './transport';

export interface IAddJourney {
  journey: IJourney;
  locations: ILocation[];
  transport: ITransport;
}
