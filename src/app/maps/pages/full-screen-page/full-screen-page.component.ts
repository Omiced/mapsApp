import { Component } from '@angular/core';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
  host: { hostID: crypto.randomUUID().toString() },
})
export class FullScreenPageComponent {}
