import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    this.authService.signup(this.username, this.email, this.password).subscribe(
      (response) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']); // Redirect to login after successful signup
      },
      (error) => {
        console.error('Signup failed:', error);
        this.errorMessage = 'Signup failed. Please try again.';
      }
    );
  }
}
