import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataServiceService } from '../../../services/data-service.service';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-employee',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  dataService = inject(DataServiceService);
  tokenService = inject(TokenService);
  userService = inject(UserService);
  router = inject(Router);

  createPostEmployeeForm = new FormGroup({
    employeeName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    designation: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get employeeName() {
    return this.createPostEmployeeForm.controls.employeeName;
  }

  get designation() {
    return this.createPostEmployeeForm.controls.designation;
  }

  onSubmitForm() {
    if (this.createPostEmployeeForm.invalid) {
      return;
    }

    this.dataService
      .postData('/employee/postEmployee', this.createPostEmployeeForm.value)
      .subscribe({
        next: (response) => {
          console.log('Post successful:', response);
          alert(response.message);
          this.createPostEmployeeForm.setValue({
            employeeName: '',
            designation: '',
          });
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
