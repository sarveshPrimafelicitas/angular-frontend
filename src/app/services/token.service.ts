import { inject, Injectable, signal } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  userService = inject(UserService);
  dataService = inject(DataServiceService);
  router = inject(Router);
  companyDetails = signal({
    companyName:""
  });

  setToken(token: string, expiryInMinutes: number) {
    const now = new Date();
    const expiryTime = now.getTime() + expiryInMinutes * 60000; // Convert minutes to milliseconds
    const tokenData = { token, expiryTime };
    localStorage.setItem('authToken', JSON.stringify(tokenData));
  }

  getToken() {
    const tokenData = localStorage.getItem('authToken');
    if (!tokenData) return null;

    const { token, expiryTime } = JSON.parse(tokenData);
    const now = new Date().getTime();

    if (now > expiryTime) {
      localStorage.removeItem('authToken'); // Remove expired token
      return null;
    }
    return token;
  }

  isTokenValid() {
    const token = this.getToken();
    if (token) {
      this.dataService.getData(`/company/getCompanyById`).subscribe({
        next: (response) => {
          if (response.success) {
            this.companyDetails.set(response.data.user);
            this.userService.isLoggedIn.set(true);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.userService.isLoggedIn.set(false);
          localStorage.removeItem('authToken');
        },
        complete: () => {
          console.log('Request completed.');
        },
      });
    } else {
      this.userService.isLoggedIn.set(false);
      localStorage.removeItem('authToken');
      this.companyDetails.set({companyName:""});
    }
  }
}
