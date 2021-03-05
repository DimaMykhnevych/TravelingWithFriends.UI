import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

declare var H: any;

@Component({
  selector: 'app-review-route',
  templateUrl: './review-route.component.html',
  styleUrls: ['./review-route.component.scss'],
  providers: [GoogleMapsAPIWrapper],
})
export class ReviewRouteComponent implements OnInit {
  @ViewChild('map', { static: true }) public mapElement: ElementRef;

  public lat: any = '22.5726';
  public lng: any = '88.3639';

  public width: any = '1000px';
  public height: any = '600px';

  private platform: any;
  private map: any;

  private _appId: string = 'xxxxxx';
  private _appCode: string = 'uuuuuu';
  constructor() {}

  public ngOnInit() {
    this.platform = new H.service.Platform({
      app_id: this._appId,
      app_code: this._appCode,
      useHTTPS: true,
    });
  }

  public ngAfterViewInit() {
    let pixelRatio = window.devicePixelRatio || 1;
    let defaultLayers = this.platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320,
    });

    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      { pixelRatio: pixelRatio }
    );

    var behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
    var ui = H.ui.UI.createDefault(this.map, defaultLayers);

    this.map.setCenter({ lat: this.lat, lng: this.lng });
    this.map.setZoom(14);
  }
}
