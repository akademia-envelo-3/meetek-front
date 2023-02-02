import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from 'src/app/map.component';






@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [MatIconModule, MapComponent],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventCardComponent {

}
