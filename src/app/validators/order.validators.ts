import { FormControl } from '@angular/forms';

export class OrderValidators {
  static onlyNumber(control: FormControl): { [key: string]: boolean } {
    const regexp = /^-?(0|[1-9]\d*)?$/;
    if (regexp.test(control.value)) {
      return null;
    }
    return {
      onlyNumber: true,
    };
  }

  static onlyString(control: FormControl): { [key: string]: boolean } {
    const regexp = /^[a-zA-Zа-яА-я' ']+$/;
    if (regexp.test(control.value)) {
      return null;
    }
    return {
      onlyString: true,
    };
  }
}
