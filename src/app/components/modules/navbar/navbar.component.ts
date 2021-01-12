import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/Token';
import { RequestServerResponse } from 'src/app/interfaces/RequestServerResponse';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string[];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // let auth: Token = this.authService.getAuth();
  }

  logout(): void {
    
  }

}
