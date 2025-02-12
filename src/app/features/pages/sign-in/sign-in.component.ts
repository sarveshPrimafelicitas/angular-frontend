import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../../../validators/password-match/password-match.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataServiceService } from '../../../services/data-service.service';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';
import { NavbarComponent } from '../../../layouts/navbar/navbar.component';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  dataService = inject(DataServiceService);
  userService = inject(UserService);
  tokenService = inject(TokenService);
  router = inject(Router);

  signInCompanyForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get email() {
    return this.signInCompanyForm.controls.email;
  }

  get password() {
    return this.signInCompanyForm.controls.password;
  }

  onSubmitForm() {
    if (this.signInCompanyForm.invalid) {
      return;
    }

    this.dataService
      .postData('/company/loginCompany', this.signInCompanyForm.value)
      .subscribe({
        next: (response) => {
          alert(response.message);
          this.signInCompanyForm.setValue({
            email: '',
            password: '',
          });
          if (response.data.token) {
            this.tokenService.setToken(response.data.token, 24 * 60);
            this.userService.isLoggedIn.set(true);
            this.router.navigate(['/']);
            this.tokenService.companyDetails.set(response.data.user)
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert(error?.error?.message);
        },
        complete: () => {
          console.log('Request completed.');
        },
      });
  }
}
