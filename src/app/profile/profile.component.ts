import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    localStorage.removeItem('token'); // Remove token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }  


  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']); // If no token, redirect to login
    } else {
      this.authService.getProfile(token).subscribe(
        (response) => {
          this.user = response.user;
        },
        (error) => {
          console.error('Failed to fetch profile:', error);
          this.errorMessage = 'Failed to fetch profile. Please try again.';
        }
      );
    }
  }
}
