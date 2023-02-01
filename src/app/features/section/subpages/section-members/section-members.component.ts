import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NavigationComponent, NavigationOption } from '@shared/ui';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

import { SectionCardComponent } from '../../shared/section-card';
import { MembersListComponent } from '../../shared/list/member-list';



@Component({
  selector: 'app-section-members',
  standalone: true,
  imports: [MembersListComponent, MatCardModule, SectionCardComponent, NavigationComponent, MatIconModule],
  templateUrl: './section-members.component.html',
  styleUrls: ['./section-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionMembersComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);

  navigationOptions!: NavigationOption[];
  id!: string | null;

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.navigationOptions = [
      {
        icon: 'keyboard_backspace',
        link: '/sections',
      },
      {
        icon: 'info',
        link: `/section/${this.id}`,
      },
      {
        icon: 'people',
        link: `/section/${this.id}/members`,
      },
    ];
  }
}
// to do: dodać wyszukiwarkę oraz menu górne; task nr FT037 https://github.com/akademia-envelo-3/meetek-front/issues/51 oraz task nr FT028 https://github.com/akademia-envelo-3/meetek-front/issues/47
