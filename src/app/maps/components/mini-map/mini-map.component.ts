import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  viewChild,
} from '@angular/core';
import mapboxgl, { LngLat, Marker } from 'mapbox-gl';

@Component({
  selector: 'mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];
  public divMap = viewChild.required<ElementRef>('map');
  public map?: any;

  ngAfterViewInit(): void {
    if (!this.divMap) return;
    if (!this.lngLat) throw "LngLat can't be null";
    const [lng, lat] = this.lngLat;
    const coords = new LngLat(lng, lat);
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiY2Fuam92aSIsImEiOiJjbHd5a3Fra2QwNnhjMnNwcndrZzE4MDN4In0.ltaVjej7Kli72Mq2SR1QcQ',
      container: this.divMap().nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: coords,
      zoom: 13,
      interactive: false,
    });

    new Marker().setLngLat(coords).addTo(this.map);
  }
}
