import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  loading: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getCurrentUser()
      .pipe(first())
      .subscribe(user => {
        this.loading = false;
        this.user = user;
      });
  }

  callAdminEndpoint() {
    this.userService
      .getAdmin()
      .subscribe(data => {
        this.snackBar.open(data.body.message, 'Cerrar', {
          duration: 3000
        });
      },
        error => {
          if (error.status === 403) {
            this.snackBar.open("Ups! no tenes permiso para ejecutar este comando", 'Cerrar', {
              duration: 3000
            });
          } else {
            this.snackBar.open(error.message || error.statusText, 'Cerrar', {
              duration: 3000
            });
          }
        });
  }

  callUserEndpoint() {
    this.userService
      .getGreeting()
      .subscribe(data => {
        this.snackBar.open(data.body.message, 'Cerrar', {
          duration: 3000
        });
      },
        error => {
          this.snackBar.open(error, 'Cerrar', {
            duration: 3000
          });
        });
  }

  logout() {
    this.authService.logout();
  }
}
