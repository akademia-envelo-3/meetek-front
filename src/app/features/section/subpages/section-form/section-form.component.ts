import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ReactiveFormsModule,
  FormsModule,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from '@core/store/user.selectors';

interface organizers {
  firstName?: string;
  lastName?: string;
  id?: number;
}

@Component({
  selector: 'app-section-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
  ],
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFormComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private store = inject(Store);

  loggedInUser$ = this.store.select(selectLoggedUser);
  newSectionForm = this.createNewSectionForm();
  organizers: organizers[] = [];

  // get value from selector and set it to organizers

  ngOnInit() {
    this.loggedInUser$.subscribe(user => {
      this.organizers.push({
        firstName: user?.firstName,
        lastName: user?.lastName,
        id: user?.id,
      });
    });

    console.log(this.organizers);

    this.newSectionForm.controls.organizer.setValue(this.organizers);
  }
  

  addOrganizer(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      console.log(value);
    }

    // Clear the input value
    event.chipInput.clear();

    // this.newSectionForm.get('organizer')?.setValue(null);
  }

  // removeOrganizer(organizer: string) {
  //   const index = this.organizers.indexOf(organizer);

  //   if (index >= 0) {
  //     this.organizers.splice(index, 1);
  //   }
  // }

  getErrorMessage(formControlName: string) {
    const control = this.newSectionForm.get(formControlName);
    if (control?.hasError('required')) {
      switch (formControlName) {
        case 'name':
          return 'Pole wymagane';
        case 'description':
          return 'Pole wymagane';
        case 'organizer':
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

    return '';
  }

  createSection() {
    this.newSectionForm.markAllAsTouched();

    if (this.newSectionForm.invalid) {
      return;
    }

    console.log(this.newSectionForm.getRawValue());
  }

  private createNewSectionForm() {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      description: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250),
      ]),
      organizer: this.formBuilder.control([{}], [Validators.required]),
    });

    return form;
  }
}
