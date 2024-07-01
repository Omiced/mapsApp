import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';
import { LngLat } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class MarkersPageComponent implements AfterViewInit {
  private cdref = inject(ChangeDetectorRef);
  public divMap = viewChild.required<ElementRef>('map');

  public markers: MarkerAndColor[] = [];
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
      center: this.currentLngLat,
      zoom: 13,
    });
    this.readFromLocalStorage();
  }

  createMarker() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map?.getCenter();
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string = 'red') {
    if (!this.map) return;
    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    this.markers.push({
      color,
      marker,
    });
    this.saveToLocalStorage();
    marker.on('dragend', () => this.saveToLocalStorage);
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    if (!this.map) return;
    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  getPlainMarkers(arr: MarkerAndColor[]): PlainMarker[] {
    return this.markers.map((marker) => {
      return {
        color: marker.color,
        lngLat: marker.marker.getLngLat().toArray(),
      };
    });
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      'plainMarkers',
      JSON.stringify(this.getPlainMarkers(this.markers))
    );
  }

  readFromLocalStorage(): void {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker(coords, color);
    });
  }
}
