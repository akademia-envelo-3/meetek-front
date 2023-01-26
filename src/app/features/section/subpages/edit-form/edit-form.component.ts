import { AsyncPipe, NgIf, NgForOf, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { sectionDetailsActions, selectSectionDetails } from '../..';

@Component({
  selector: 'app-edit-form',
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
    JsonPipe
  ],
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent implements OnInit {
  private formBuilder = inject(NonNullableFormBuilder);
  private activeRoute = inject(ActivatedRoute);
  private store = inject(Store);

  sectionDetails$ = this.store.select(selectSectionDetails);
  editSectionForm = this.editSectionsForm();
  organizers = [{ firstName: 'Jan', lastName: 'Kowalski' }];

  ngOnInit() {
    this.activeRoute.parent?.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(sectionDetailsActions.getSectionDetails({ sectionId: +id }));
      }
    })
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

    // this.editSectionForm.controls.sectionOwner.setValue(this.organizers);
    // this.store.dispatch(SectionActions.addSection({ section: this.editSectionForm.getRawValue() }));
    console.log(this.editSectionForm.getRawValue());
  }

  private editSectionsForm() {
    const form = this.formBuilder.group({
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      description: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250)
      ]),
      sectionOwner: this.formBuilder.control(this.organizers),
    });

    return form;
  }
}
