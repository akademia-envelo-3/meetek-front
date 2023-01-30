import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { selectLoggedUser } from '@core/store/user.selectors';
import { SectionActions, organizer } from '../../../../section';
import { validateCharacters, validateNotNumbers } from '../../section-form';

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
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private store = inject(Store);

  loggedInUser$ = this.store.select(selectLoggedUser);
  newSectionForm = this.createNewSectionForm();
  organizers!: organizer;

  ngOnInit() {
    this.loggedInUser$.subscribe(user => {
      this.organizers = {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
      }
    });
  }

  getErrorMessage(formControlName: string) {
    const control = this.newSectionForm.get(formControlName);
    if (control?.hasError('required')) {
      switch (formControlName) {
        case 'name':
          return 'Pole wymagane';
        case 'description':
          return 'Pole wymagane';
      }
    }
    if (control?.hasError('minlength')) {
      switch (formControlName) {
        case 'name':
          return 'Nazwa jest za krótka';
        case 'description':
          return 'Opis jest za krótki';
      }
    }
    if (control?.hasError('maxlength')) {
      switch (formControlName) {
        case 'name':
          return 'Nazwa jest za długa';
        case 'description':
          return 'Opis jest za długi';
      }
    }
    if (control?.hasError('invalidCharacters')) {
      switch (formControlName) {
        case 'name':
          return 'Nazwa zawiera niedozwolone znaki';
        case 'description':
          return 'Opis zawiera niedozwolone znaki';
      }
    }
    if (control?.hasError('onlyNumbers')) {
      switch (formControlName) {
        case 'name':
          return 'Nazwa nie może składać się tylko z cyfr';
        case 'description':
          return 'Opis nie może składać się tylko z cyfr';
      }
    }
    if (control?.hasError('onlySpaces')) {
      switch (formControlName) {
        case 'name':
          return 'Nieprawidłowa nazwa';
        case 'description':
          return 'Nieprawidłowy opis';
      }
    }

    return '';
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
