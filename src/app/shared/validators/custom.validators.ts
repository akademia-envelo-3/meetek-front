import { FormControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export function validateCharacters(control: FormControl) {
  const lettersNumbersAndWhitespaces = /^[A-Za-z0-9\s]+$/;
  if (control.value && !lettersNumbersAndWhitespaces.test(control.value)) {
    return { invalidCharacters: true };
  }
  return null;
}

export function validateNotNumbers(control: FormControl) {
  const input = control.value.trim();
  if (!input) return { onlySpaces: true };
  const onlyNumbers = /^[0-9]+$/;
  if (onlyNumbers.test(input)) {
    return { onlyNumbers: true };
  }
  return null;
}

export function whitespaceValidator(control: AbstractControl) {
  const whitespaceRegex = /\s/g;
  const isValid = !whitespaceRegex.test(control.value);
  return isValid ? null : { whitespace: true };
}

export function emailValidator(control: AbstractControl) {
  const emailRegex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = emailRegex.test(control.value);
  return isValid ? null : { email: true };
}
