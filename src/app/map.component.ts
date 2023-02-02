import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LayerGroup } from 'leaflet';

@Component({
  selector: 'app-map',
  standalone:true,
  imports:[LeafletModule],
  template: `
    <div class="map-container">
  <div class="map-frame">
    <div id="map"></div>
  </div>
</div>
  `,
  styles: [`
    .map-container {
     
    }
    
    .map-frame {
      height: 120px;
    }
    
    #map {
      height: 120px;
    }
    `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map | L.LayerGroup;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 52.2297, 21.0122 ],
      zoom: 12,
      zoomControl:false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
