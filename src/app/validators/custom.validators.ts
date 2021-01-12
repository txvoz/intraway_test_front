import { AbstractControl, ValidationErrors } from '@angular/forms';
import { element } from 'protractor';
import { CatalogService } from '../services/catalog.service';
import { Http } from '@angular/http';

/*export function emailCorpValidator(
  control: AbstractControl
) {

  let catalogService:CatalogService = new CatalogService;

  let blacklist: any[] = [];
  catalogService
    .getBlackdomains()
    .subscribe(response =>
      {
        blacklist = response;
        console.log("LLEGO==>"+blacklist);
      }
  );

  console.log("PROSIGUE=>"+blacklist);

  const valueEmail = control.value;
  const values = [];

  blacklist.forEach(element => {
    values.push(element.domain);
  });

  if (values.find(element => valueEmail.includes(element))) {
    return { emailCorp: true };
  }
  else {
    return null;
  }
}*/

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';

  if (!value) {
    return null
  }

  let upperCaseCharacters = /[A-Z]+/g
  if (upperCaseCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine Upper case characters,current value ${value}` };
  }

  let lowerCaseCharacters = /[a-z]+/g
  if (lowerCaseCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine lower case characters,current value ${value}` };
  }


  let numberCharacters = /[0-9]+/g
  if (numberCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine number characters,current value ${value}` };
  }

  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
  if (specialCharacters.test(value) === false) {
    return { passwordStrength: `text has to contine special character,current value ${value}` };
  }
  return null;
}