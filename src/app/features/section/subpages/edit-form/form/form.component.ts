import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { User, selectSectionDetails, selectAllUsers, SectionActions, sectionDetailsActions } from '../../../';
import { validateCharacters, validateNotNumbers } from '../';

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
  editedOwner!: User;

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id }));
      }
    });

    this.sectionDetails$.subscribe(section => {
      this.editSectionForm.patchValue(section);
      this.editedOwner = section.sectionOwner;
    });
  }

  selectedUser(event: MatAutocompleteSelectedEvent) {
    this.editedOwner = event.option.value;
  }

  getFilteredUsers() {
    this.filteredUsers$ = this.allUsers$.pipe(
      map(users =>
        users.filter(user => {
          const isSelected = user.id !== this.editedOwner.id;
          const isIncluded = (user.firstName + ' ' + user.lastName)
            .toLowerCase()
            .includes(String(this.editSectionForm.controls.sectionOwner.getRawValue()).toLowerCase());

          return isSelected && isIncluded;
        })
      )
    );
  }

  getErrorMessage(formControlName: string) {
    const control = this.editSectionForm.get(formControlName);
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
        validateNotNumbers
      ]),
      description: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250),
        validateNotNumbers
      ]),
      sectionOwner: this.formBuilder.control(this.editedOwner),
    });

    return form;
  }
}
