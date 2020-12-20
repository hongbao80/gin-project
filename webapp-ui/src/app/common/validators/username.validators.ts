import { AbstractControl, ControlContainer, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";

export class UsernameValidators {

    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if ((control.value as string ).indexOf(' ') >= -1) {
            return {cannotContainSpace : true}
        }
        return null
    }

    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'hbteamobi') 
                    resolve({shouldBeUnique: true})
                else resolve(null);
            }, 1000);
           
        })
    }
}