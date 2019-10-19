import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { AuthService } from '../_services/auth.service';
import { MatSnackBar } from '@angular/material';

export interface UserData {
  property: string;
  value: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  loading: boolean;
  dataSource: UserData[];
  displayedColumns: string[] = ['property', 'value'];

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
        this.initUserData();
      });
  }

  private initUserData() {
    console.log(this.user);
    this.dataSource = [
      {property: "Username: ", value: this.user.username},
      {property: "Password: ", value: this.user.password},
      {property: "Enabled: ", value: this.user.enabled},
      {property: "CredentialsNonExpired: ", value: this.user.credentialsNonExpired},
      {property: "AccountNonExpired: ", value: this.user.accountNonExpired},
      {property: "AccountNonLocked: ", value: this.user.accountNonLocked}
    ];
    this.user.authorities.forEach(authority => {
      this.dataSource.push({property: "Authority: ", value: authority.authority})
    });
  }

  callAdminEndpoint() {
    this.userService
      .getAdmin()
      .subscribe(data => {
        this.snackBar.open(data.body.message, 'Close', {
          duration: 3000
        });
      },
        error => {
          if (error.status === 403) {
            this.snackBar.open("Oops! You don't have permission to access to this resource", 'Close', {
              duration: 3000
            });
          } else {
            this.snackBar.open(error.message || error.statusText, 'Close', {
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
