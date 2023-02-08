import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap, of } from 'rxjs';

import { User, selectSectionDetails, selectAllUsers, SectionActions, sectionDetailsActions } from '../../../';
import { validateCharacters, validateNotNumbers } from '../';
import { HOME_PATHS } from 'src/app/features/home';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    MatIconModule,
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
    MatAutocompleteModule,
    RouterModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private activeRoute = inject(ActivatedRoute);
  private store = inject(Store);

  sectionDetails$ = this.store.select(selectSectionDetails);
  allUsers$ = this.store.select(selectAllUsers);
  editSectionForm = this.editSectionsForm();
  filteredUsers$!: Observable<User[]>;
  HomePaths = HOME_PATHS;
  editedOwner!: User;
  nameLetterCounter!: number;
  descriptionLetterCounter!: number;

  errorsTree = {
    name: {
      required: 'Pole wymagane',
      minlength: 'Nazwa jest za krótka',
      maxlength: 'Maksymalna liczba znaków to 30',
      invalidCharacters: 'Nazwa zawiera niedozwolone znaki',
      onlyNumbers: 'Nazwa nie może składać się tylko z cyfr',
      onlySpaces: 'Nieprawidłowa nazwa',
    },
    description: {
      required: 'Pole wymagane',
      minlength: 'Opis jest za krótki',
      maxlength: 'Maksymalna liczba znaków to 250',
      invalidCharacters: 'Opis zawiera niedozwolone znaki',
      onlyNumbers: 'Opis nie może składać się tylko z cyfr',
      onlySpaces: 'Nieprawidłowy opis',
    },
  };

  ngOnInit() {
    this.activeRoute.parent?.paramMap
      .pipe(
        map(params => params?.get('id')),
        switchMap(id =>
          id ? of(this.store.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id }))) : of([])
        )
      )
      .subscribe();

    this.sectionDetails$.subscribe(section => {
      this.editSectionForm.patchValue(section);
      this.editedOwner = section.sectionOwner;
      this.nameLetterCounter = section.name.length;
    this.descriptionLetterCounter = section.description.length;
    });
  }

  preventLongTitle(event: KeyboardEvent) {
    if (this.editSectionForm.getRawValue().name.length >= 30) {
      event.preventDefault();
    }
  }

  preventLongDescription(event: KeyboardEvent) {
    if (this.editSectionForm.getRawValue().description.length >= 250) {
      event.preventDefault();
    }
  }

  selectedUser(event: MatAutocompleteSelectedEvent) {
    this.editedOwner = event.option.value;
  }

  getFilteredUsers() {
    this.filteredUsers$ = this.allUsers$.pipe(
      map(users =>
        users.filter(user => {
          const isSelected = user.id !== this.editedOwner.id;

          if (!isSelected) {
            return isSelected;
          } else {
            const isIncluded = (user.firstName + ' ' + user.lastName)
              .toLowerCase()
              .includes(String(this.editSectionForm.controls.sectionOwner.getRawValue()).toLowerCase());

            return isIncluded;
          }
        })
      )
    );
  }

  getErrorMessage(formControlName: 'name' | 'description') {
    const control = this.editSectionForm.get(formControlName);

    if (control?.hasError('required')) {
      return this.errorsTree[formControlName].required;
    }

    if (control?.hasError('minlength')) {
      return this.errorsTree[formControlName].minlength;
    }

    if (control?.hasError('maxlength')) {
      return this.errorsTree[formControlName].maxlength;
    }

    if (control?.hasError('invalidCharacters')) {
      return this.errorsTree[formControlName].invalidCharacters;
    }

    if (control?.hasError('onlyNumbers')) {
      return this.errorsTree[formControlName].onlyNumbers;
    }

    if (control?.hasError('onlySpaces')) {
      return this.errorsTree[formControlName].onlySpaces;
    }

    return '';
  }

  editSection() {
    this.editSectionForm.markAllAsTouched();

    if (this.editSectionForm.invalid) {
      return;
    }

    this.editSectionForm.controls.sectionOwner.setValue(this.editedOwner);

    this.sectionDetails$.subscribe(section => {
      this.store.dispatch(
        SectionActions.editSection({
          sectionId: section.id,
          section: this.editSectionForm.getRawValue(),
        })
      );
    });
  }

  private editSectionsForm() {
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
        validateNotNumbers,
      ]),
      sectionOwner: this.formBuilder.control(this.editedOwner),
    });

    return form;
  }
}
