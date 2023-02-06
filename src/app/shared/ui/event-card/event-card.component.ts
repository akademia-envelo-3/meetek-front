import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as L from 'leaflet';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatCardModule } from '@angular/material/card';

import { EventSpecs } from './event-card.interface';

@Component({
  selector: 'app-event-card[event]',
  standalone: true,
  imports: [MatIconModule, NgIf, NgClass, LeafletModule, MatCardModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent implements OnInit, AfterViewInit {
  @Input() event!: EventSpecs;

  mapId!: string;

  ngOnInit(): void {
      this.mapId = 'map' + this.event.id;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private map!: L.Map | L.LayerGroup;
  private initMap(): void {
    this.map = L.map(this.mapId, {
      center: this.event.mapCords,
      zoom: 12,
      zoomControl: false,
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });

    tiles.addTo(this.map);
  }
}
