import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.user) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  login(): void {

  }

  validate(): boolean {
    return true;
  }
}
