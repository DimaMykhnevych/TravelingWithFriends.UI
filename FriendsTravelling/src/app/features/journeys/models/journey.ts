export interface IJourney {
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
}
