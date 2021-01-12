import { Component, OnInit } from '@angular/core';
import { FizzBuzz } from 'src/app/interfaces/FizzBuzz';
import { RequestServerResponse } from 'src/app/interfaces/RequestServerResponse';
import { FizzBuzzService } from 'src/app/services/fizzbuzz.service';

@Component({
  selector: 'app-fizzbuzz-list',
  templateUrl: './fizzbuzz-list.component.html',
  styleUrls: ['./fizzbuzz-list.component.scss']
})
export class FizzBuzzListComponent implements OnInit {

  public items: FizzBuzz[];

  constructor(
    private service: FizzBuzzService,
  ) {

  
    this.service.findAll().subscribe((rs: RequestServerResponse<FizzBuzz[]>) => {
      this.items = rs.data;
      console.log(this.items);
    });

  }

  ngOnInit(): void {
  }

}
