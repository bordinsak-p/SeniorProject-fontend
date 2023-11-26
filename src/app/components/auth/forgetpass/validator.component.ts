import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  const mismatch = password && confirmPassword && password.value !== confirmPassword.value;
  console.log('Mismatch:', mismatch);

  return mismatch ? { 'mismatch': true } : null;
};

