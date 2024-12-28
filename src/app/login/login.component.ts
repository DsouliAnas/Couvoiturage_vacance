import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient to make API requests
import { Router } from '@angular/router';  // Import Router for redirection
import { environment } from 'src/environments/environment';  // Optional: Use environment variables for API URLs

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';  // Bind to input field
  password: string = '';  // Bind to input field
  errorMessage: string = '';  // For error messages

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post(`${environment.apiUrl}/auth/login`, credentials).subscribe({
      next: (response: any) => {
        // Save the token to localStorage (or cookies, etc.)
        localStorage.setItem('token', response.token);

        // Redirect to the profile page or dashboard
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';  // Show error message
      }
    });
  }
}
