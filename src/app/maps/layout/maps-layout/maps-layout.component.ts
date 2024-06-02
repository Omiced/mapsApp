import { Component } from '@angular/core';

@Component({
  templateUrl: './maps-layout.component.html',
  styleUrl: './maps-layout.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class MapsLayoutComponent {}
