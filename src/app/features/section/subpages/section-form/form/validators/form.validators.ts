import { FormControl } from '@angular/forms';

export function validateCharacters(control: FormControl) {
  const lettersNumbersAndWhitespaces = /^[A-Za-z0-9\s]+$/;
  if (control.value && !lettersNumbersAndWhitespaces.test(control.value)) {
    return { invalidCharacters: true };
  }
  return null;
}

export function validateNotNumbers(control: FormControl) {
  const input = control.value.trim();
  if (!input) return { onlySpaces: true }
  const onlyNumbers = /^[0-9]+$/;
  if (onlyNumbers.test(input)) {
    return { onlyNumbers: true };
  }
  return null;
}