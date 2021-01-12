import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FizzBuzz, Item } from 'src/app/interfaces/FizzBuzz';
import { RequestServerResponse } from 'src/app/interfaces/RequestServerResponse';
import { Router } from '@angular/router';
import { FizzBuzzService } from 'src/app/services/fizzbuzz.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-fizzbuzz-create',
  templateUrl: './fizzbuzz-create.component.html',
  styleUrls: ['./fizzbuzz-create.component.scss']
})
export class FizzBuzzCreateComponent implements OnInit {

  createForm: FormGroup;
  items: Item[];

  constructor(
    private service: FizzBuzzService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.items = [];

    this.createForm = this.formBuilder.group({
      min: ['', Validators.required], 
      max: ['', Validators.required]
    });
  }

  submit(){
    if (this.createForm.valid) {

      let min = this.createForm.value.min;
      let max = this.createForm.value.max;

     this.service.requestFizzBuzz(min,max).subscribe((response: RequestServerResponse<Item[]>) => {
        this.items = response.data;
        //$('#newBrandModal button.close').click();
        //this.router.navigateByUrl('fizzbuzz/' + response.data.slug + '/edit');
        this.createForm.reset();

        window.setTimeout(function(){
          window.location.reload()
        },3000);

      }, (err: RequestServerResponse<any>) => {
        console.log(err);
        alert(err.message);
      });
    }
  }

}
