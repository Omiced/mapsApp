import { Component } from '@angular/core';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class MarkersPageComponent {}
