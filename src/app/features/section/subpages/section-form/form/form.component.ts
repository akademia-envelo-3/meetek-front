import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { selectLoggedUser } from '@core/store/user.selectors';
import { SectionActions } from '../../../../section';
import { Organizer } from '@shared/interfaces/section-form.interface';
import { validateCharacters, validateNotNumbers } from '../../section-form';
import { ErrorMessageComponent } from '@shared/validators';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    AsyncPipe,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;

  nameCounter!: number;
  private formBuilder = inject(NonNullableFormBuilder);
  private store = inject(Store);

  loggedInUser$ = this.store.select(selectLoggedUser);
  newSectionForm = this.createNewSectionForm();
  organizers!: Organizer;
  letterCount = 0;
  descriptionLetterCount = 0;

  ngOnInit() {
    this.loggedInUser$.subscribe(user => {
      this.organizers = {
        firstName: user.firstName,
        lastName: user.lastName.length > 12 ? user.lastName.slice(0, 12) + '...' : user.lastName,
        id: user.id,
      };
    });
  }

  nameLetterCounter() {
    this.nameCounter = this.newSectionForm.getRawValue().name.length;
  }

  preventLongTitle(event: KeyboardEvent) {
    if (this.newSectionForm.getRawValue().name.length >= 30) {
      event.preventDefault();
    }
  }

  preventLongDescription(event: KeyboardEvent) {
    if (this.newSectionForm.getRawValue().description.length >= 250) {
      event.preventDefault();
    }
  }

  createSection() {
    this.newSectionForm.markAllAsTouched();

    if (this.newSectionForm.invalid) {
      return;
    }

    this.newSectionForm.controls.sectionOwner.setValue(this.organizers);
    this.store.dispatch(SectionActions.addSection({ section: this.newSectionForm.getRawValue(), isActive: true }));
  }

  private createNewSectionForm() {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        validateCharacters,
        validateNotNumbers,
      ]),
      description: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250),
        validateCharacters,
        validateNotNumbers,
      ]),
      sectionOwner: this.formBuilder.control(this.organizers),
    });

    return form;
  }
}
