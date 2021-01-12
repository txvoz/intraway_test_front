import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { CatalogService } from '../services/catalog.service';
import { BlackDomain } from '../interfaces/BlackDomain';
import { element } from 'protractor';

@Injectable({
    providedIn: 'root'
})
export class CustomEmailValidator {

    public static PATTERN_EMAIL:string = "^[^@]+@[^@]+\\.[a-zA-Z]{2,}$";
    protected static PATTER_DOMAIN:string = "^[^@]+@{DOMAIN}+\\.[^@]";
    
    constructor(private catalogService: CatalogService) {}

    public validators():any[] {
        let validators:any[] = [
            Validators.required, 
            Validators.pattern(CustomEmailValidator.PATTERN_EMAIL),
            this.verifiedCorporateEmail()
        ];
        return validators;
    }

    public verifiedCorporateEmail(): any {
        let that = this;
        return function(control: AbstractControl): any{
            let blacklist: BlackDomain[] = [];
            that.catalogService
                .getBlackdomains()
                .subscribe(response => {
                    blacklist = response;
                }
            );
            let isEmail:boolean = false;
            if(control.value){
                for(var i = 0; i < blacklist.length; i++){
                    let element:BlackDomain = blacklist[i];
                    let arr = element.domain.split(".");
                    let domain = arr[0];
                    let specificPattern = CustomEmailValidator.PATTER_DOMAIN.replace("{DOMAIN}",domain);
                    console.log("SPECIFIC_DOMAIN:", specificPattern);
                    if(control.value.match(specificPattern)){
                        isEmail = true;
                    }
                }
            }

            if(isEmail){
                return { emailCorp: isEmail };
            }else{
                return null;
            }
        };
    }
}