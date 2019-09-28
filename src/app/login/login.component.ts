import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
  error = '';

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    if (this.authService.user) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    if(environment.production === false) {
      this.email.patchValue(environment.defaultEmail);
      this.password.patchValue(environment.defaultPassword);
    }
  }

  onClickSubmit(): boolean {
    this.authService.login(this.email.value, this.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          this.snackBar.open(error, "Cerrar", {
            duration: 10000,
          });
        });
    return true;
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'El email es obligatorio.';
    }

    if (this.email.hasError('email')) {
      return 'El email no cuenta con un formato valido.';
    }

    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return "La contraseña es obligatoria.";
    }

    if (this.password.hasError('minlength') || this.password.hasError('maxlength')) {
      return "La contraseña deberá tener entre 6 y 50 caracteres.";
    }

    return "";
  }
}
