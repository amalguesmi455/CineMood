import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FilmService } from "../service/film.service";
// Import necessary modules
import { Component } from '@angular/core';
import { Router } from "@angular/router";

// Decorate the class with @Component
@Component({
  selector: 'app-login', // Selector for the component
  templateUrl: './login.component.html', // Template file for the component
  styleUrls: ['./login.component.css'] // Stylesheet file for the component
})
export class LoginComponent {
  loginForm: FormGroup;
  requestToken: string | undefined;
  isLoading: boolean = false;
  error: string | undefined;

  constructor(private fb: FormBuilder, private authService: FilmService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
 
    this.error = undefined;
 
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
 
      this.authService.getRequestToken().subscribe(
        (response) => {
          this.requestToken = response.request_token;
 
          this.authService.login(username, password, response.request_token).subscribe(
            (loginResponse) => {
              console.log('SUCCESS', loginResponse);
              sessionStorage.setItem('login',JSON.stringify(loginResponse))
           
           
 
 
              // After successful login
              this.authService.createSession(this.requestToken!).subscribe(
                (sessionResponse) => {
                  console.log('Session Created:', sessionResponse);
              
                  // Store session details if needed
                  sessionStorage.setItem('session', JSON.stringify(sessionResponse));
              
                  // Now fetch account information using the created session
                  this.authService.getAccountInfo(sessionResponse.session_id!).subscribe(
                    (accountInfo) => {
                      console.log('Account Information:', accountInfo);
              
                      // Handle account information as needed
                      sessionStorage.setItem('account', JSON.stringify(accountInfo));
              
                      // Example: Navigating to a different page after fetching account info
                      this.router.navigate(['/theme']);
                    },
                    (error) => {
                      console.error('Failed to fetch account information:', error);
                      // Handle error fetching account info
                    }
                  );
                },
                (error) => {
                  console.error('Failed to create session:', error);
                  // Handle error creating session
                }
              );
              
 
             
            },
            (error) => {
              console.error('ERROR', error);
             
              this.error = 'Login failed. Please check your credentials.';
            }
          );
        },
        (error) => {
          console.error(error);
       
          this.error = 'Failed to obtain request token.';
        }
      );
    } else {
   
      this.error = 'Please enter both username and password.';
    }
  }

navigateToPage(root: string, time: number = 0) {
  setTimeout(() => {
    this.router.navigate([root]);
  }, time);
}
}
 