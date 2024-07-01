import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  viewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLat } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  public divMap = viewChild.required<ElementRef>('map');
  public zoom: number = 10;
  public map?: any;
  public currentLngLat: LngLat = new LngLat(
    -99.10807704101873,
    19.397462774760967
  );
  ngAfterViewInit(): void {
    if (!this.divMap) return;
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiY2Fuam92aSIsImEiOiJjbHd5a3Fra2QwNnhjMnNwcndrZzE4MDN4In0.ltaVjej7Kli72Mq2SR1QcQ',
      container: this.divMap().nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
    this.mapListeners();
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'mapa no inicializado';
    this.map.on('zoom', (ev: any) => {
      this.zoom = this.map.getZoom();
    });
    this.map.on('zoomend', (ev: any) => {
      if (this.map.getZoom() < 18) return;
      this.map.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
      const { lng, lat } = this.currentLngLat;
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = +value;
    this.map?.zoomTo(this.zoom);
  }
}
