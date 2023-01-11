import { AbstractControl } from "@angular/forms";

export function whitespaceValidator(control: AbstractControl) {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}