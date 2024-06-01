import { Component } from '@angular/core';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class PropertiesPageComponent {}
