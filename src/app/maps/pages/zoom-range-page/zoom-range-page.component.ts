import { Component } from '@angular/core';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class ZoomRangePageComponent {}
