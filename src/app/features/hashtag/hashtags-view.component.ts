import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { HashtagActions } from './store/hashtag.actions';
import { selectAllHashtags } from './store/hashtag.selectors';
import { CategoryHashtagCardComponent, InputDialogComponent, SearchComponent } from '@shared/ui';
import { selectLoggedUser } from '@core/store/user.selectors';
import { UserRole } from '@core/store';

@Component({
  selector: 'app-hashtags-view',
  standalone: true,
  imports: [
    MatCardModule,
    CategoryHashtagCardComponent,
    AsyncPipe,
    NgFor,
    NgIf,
    SearchComponent,
    InputDialogComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './hashtags-view.component.html',
  styleUrls: ['./hashtags-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HashtagsViewComponent {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  hashtagsCollection$ = this.store.select(selectAllHashtags);
  userRole$ = this.store.select(selectLoggedUser).pipe(map(user => user.role));

  constructor() {
    this.store.dispatch(HashtagActions.getHashtags());
  }

  openAddHashtagModal(role: UserRole) {
    const isAdmin = role === 'admin';

    const dialogTitle = isAdmin ? 'Dodaj hashtag' : 'Nazwa hashtaga';
    const dialogLabelContent = 'Wpisz nazwę hashtaga';
    const dialogButtonContent = isAdmin ? 'Dodaj' : 'Wyślij prośbę';

    this.openDialog(dialogTitle, dialogLabelContent, dialogButtonContent, isAdmin);
  }

  private openDialog(
    title: string,
    inputLabelText: string,
    buttonText: string,
    isAdmin: boolean,
    importedDialogData?: string
  ) {
    const dialogRef = this.dialog.open(InputDialogComponent, {
      data: { title, inputLabelText, importedDialogData, buttonText },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (isAdmin && result) {
        // brak taska: dodanie nowej kategorii
      }
      if (!isAdmin && result) {
        // brak taska: wysłanie prośby o dodanie hashtaga
      }
    });
  }
}
