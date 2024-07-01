import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
//como necesito esperar a que todo el html este renderizado utilizamos after viewinit
export class FullScreenPageComponent implements AfterViewInit {
  public divMap = viewChild.required<ElementRef>('map');

  ngAfterViewInit(): void {
    if (!this.divMap) return;
    const map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiY2Fuam92aSIsImEiOiJjbHd5a3Fra2QwNnhjMnNwcndrZzE4MDN4In0.ltaVjej7Kli72Mq2SR1QcQ',
      container: this.divMap().nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
