import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../../validators/password-match/password-match.component';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../../../services/data-service.service';
import { UserService } from '../../../services/user.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css',
})
export class CreateAccountComponent {
  dataService = inject(DataServiceService);
  userService = inject(UserService);
  tokenService = inject(TokenService);
  router = inject(Router);

  createPostCompanyForm = new FormGroup(
    {
      companyName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      companyType: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    { validators: passwordMatchValidator() }
  );

  get companyName() {
    return this.createPostCompanyForm.controls.companyName;
  }

  get companyType() {
    return this.createPostCompanyForm.controls.companyType;
  }
  get email() {
    return this.createPostCompanyForm.controls.email;
  }

  get password() {
    return this.createPostCompanyForm.controls.password;
  }

  get confirmPassword() {
    return this.createPostCompanyForm.controls.confirmPassword;
  }

  get passwordMismatch() {
    return this.createPostCompanyForm.hasError('passwordMismatch');
  }

  onSubmitForm() {
    if (this.createPostCompanyForm.invalid) {
      return;
    }

    this.dataService
      .postData('/company/registerCompany', this.createPostCompanyForm.value)
      .subscribe({
        next: (response) => {
          console.log('Post successful:', response);
          alert(response.message);
          this.createPostCompanyForm.setValue({
            companyName: '',
            companyType: '',
            email: '',
            password: '',
            confirmPassword: '',
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

    // this.blogPostService.createBlogPost(
    //   this.createPostForm.getRawValue().title,
    //   this.createPostForm.getRawValue().content
    // );
  }
}
