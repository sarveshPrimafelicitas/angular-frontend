import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { DataServiceService } from '../../services/data-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('modalContainer', { static: false }) modalContainer!: ElementRef;

  userService = inject(UserService);
  tokenService = inject(TokenService);
  isModalOpen = signal(false);
  router = inject(Router);

  ngOnInit() {
    this.tokenService.isTokenValid(); // Call the function when the component loads
  }

  logoutUser() {
    localStorage.removeItem('authToken');
    this.userService.isLoggedIn.set(false);
    this.tokenService.companyDetails.set({ companyName: '' });
    this.router.navigate(['/sign-in']); //
    this.setIsModal(false)
  }

  setIsModal(value: boolean) {
    this.isModalOpen.set(value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (
      this.isModalOpen() &&
      this.modalContainer &&
      !this.modalContainer.nativeElement.contains(event.target)
    ) {
      this.setIsModal(false);
    }
  }
}
