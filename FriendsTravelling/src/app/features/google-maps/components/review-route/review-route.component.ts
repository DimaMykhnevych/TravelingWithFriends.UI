import { Component, OnInit } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
export interface ILatLng {
  latitude: number;
  longitude: number;
}
@Component({
  selector: 'app-review-route',
  templateUrl: './review-route.component.html',
  styleUrls: ['./review-route.component.scss'],
  providers: [GoogleMapsAPIWrapper],
})
export class ReviewRouteComponent implements OnInit {
  private directionsRenderer: any;
  // origin: ILatLng = {
  //   latitude: 38.889931,
  //   longitude: -77.009003,
  // };
  // // New York City, NY, USA
  // destination: ILatLng = {
  //   latitude: 40.73061,
  //   longitude: -73.935242,
  // };
  origin = { lat: 24.799448, lng: 120.979021 };
  destination = { lat: 24.799524, lng: 120.975017 };
  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}
  ngOnInit(): void {
    this.drawDirectionsRoute();
  }
  drawDirectionsRoute() {
    this.gmapsApi.getNativeMap().then((map) => {
      if (!this.directionsRenderer) {
        this.directionsRenderer = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
      }
      const directionsRenderer = this.directionsRenderer;
      const directionsService = new google.maps.DirectionsService();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: { lat: 13, lng: 80 },
          destination: {
            lat: 14,
            lng: 80,
          },
          waypoints: [],
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            // If you'll like to display an info window along the route
            // middleStep is used to estimate the midpoint on the route where the info window will appear
            // const middleStep = (response.routes[0].legs[0].steps.length / 2).toFixed();
            // const infowindow2 = new google.maps.InfoWindow();
            // infowindow2.setContent(`${response.routes[0].legs[0].distance.text} <br> ${response.routes[0].legs[0].duration.text}  `);
            // infowindow2.setPosition(response.routes[0].legs[0].steps[middleStep].end_location);
            // infowindow2.open(map);
          } else {
            console.log('Directions request failed due to ' + status);
          }
        }
      );
    });
  }
}
