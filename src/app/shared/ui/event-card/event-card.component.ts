import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventSpecs } from './event-card.interface';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LayerGroup } from 'leaflet';








@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatIconModule,NgIf,NgClass, LeafletModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent implements OnInit {
@Input() event! : EventSpecs;

mapId! : string;
private map!: L.Map | L.LayerGroup;
  private initMap(): void {
    this.map = L.map('map', {
      center: this.event.mapCords,
      zoom: 12,
      zoomControl:false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
 

  ngOnInit(): void {
    this.mapId ="map" + this.event.id;
    this.initMap();
  }
}
