import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, marker, tileLayer, Map, icon, Marker } from 'leaflet';

@Component({
  selector: 'app-event-map',
  standalone: true,
  imports: [LeafletModule],
  template: `
    <div
      class="map"
      style="height: {{ height }}px"
      leaflet
      [leafletOptions]="options"
      [leafletLayer]="layer"
      (leafletMapReady)="onMapReady($event)">
    </div>
  `,
  styleUrls: ['event-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMapComponent implements OnInit {
  @Input() lat!: number;
  @Input() lng!: number;
  @Input() height = 200;
  options = {
    layers: [tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Meetek' })],
    zoom: 15,
    center: latLng(0, 0),
  };
  layer!: Marker
  map!: Map;

  async onMapReady(map: Map) {
    this.map = map;
    await new Promise(resolve => setTimeout(resolve, 100));
    this.map.invalidateSize(false);
  }

  ngOnInit() {
    this.options.center = latLng(this.lat, this.lng);
    this.layer = marker([this.lat, this.lng], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
      }),
    })
  }
}
