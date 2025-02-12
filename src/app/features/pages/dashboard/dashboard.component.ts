import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  http = inject(HttpClient);
  tokenService = inject(TokenService);
  userService = inject(UserService);

  // fetchCheck() {
  //   this.http.get('/Any').subscribe((data) => {
  //     console.log({ dsds: data });
  //   });
  // }

  // submitForm(){
  //   this.http.post("/company/registerCompany",{})
  // }
}
