import { AbstractControl, ValidatorFn } from "@angular/forms";

export class TounamentValidators {
    static greaterThan(propMin: string, propMax: string) : ValidatorFn {
        return (fg: AbstractControl) => {
          const min = fg.get(propMin)?.value;
          const max = fg.get(propMax)?.value;
          if(!min || !max || min <= max) {
            return null;
          }
          let result: any = {};
          result[propMax] = true;
          return result;
        }
      }
}
