import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
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
}
