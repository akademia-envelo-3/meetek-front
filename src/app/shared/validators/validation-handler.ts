import { ValidationErrors } from '@angular/forms';

type Message = {
  message: string;
  validatorErrorsKey?: string[];
};

export const getValidatorErrorMessage = (
  validatorName: string,
  validatorErrors?: ValidationErrors
): string | undefined => {
  const args = messages.get(validatorName)?.validatorErrorsKey?.map(name => validatorErrors?.[name]);
  return args ? stringFormat(messages.get(validatorName)?.message, ...args) : messages.get(validatorName)?.message;
};

const messages = new Map<string, Message>([
  ['required', { message: 'Pole wymagane' }],
  ['minlength', { message: 'Minimalna ilość znaków, to {0}', validatorErrorsKey: ['requiredLength'] }],
  ['maxlength', { message: 'Maksymalna ilość znaków, to {0}', validatorErrorsKey: ['requiredLength'] }],
  ['email', { message: 'Niepoprawny adres email' }],
  ['pattern', { message: 'Niewłaściwy format' }],
  ['onlyNumbers', { message: 'Pole nie może składać się z samych cyfr' }],
  ['onlySpaces', { message: 'Pole nie może zawierać samych spacji' }],
  ['invalidCharacters', { message: 'Nazwa zawiera niedozwolone znaki' }],
  ['whitespace', { message: 'Pole nie może zawierać spacji' }],
]);

function stringFormat(template: string | undefined, ...args: string[]) {
  if (template) {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  return undefined;
}
