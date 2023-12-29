import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  search=''
  constructor(private router: Router ,private elementRef: ElementRef,private auth:FilmService ){}


  shouldShowNavbar(): boolean {
   
    return (
      this.router.url === '/theme'||
      this.router.url === '/login'

    );
   }   
   
   showBtn (): boolean {
    return this.router.url === '/' 
   } 
   isMenuOpen=false
  
    
   navItemsDisplay:any
   showNavItems(){
   
     this.isMenuOpen=!this.isMenuOpen
    
   }
  //  logout(){
  //   this.auth.logout() ;
  //   this.router.navigate(['/'])
    
  //   }
  onLogoutClick() {
    // Retrieve sessionId from session storage
    const sessionId = JSON.parse(sessionStorage.getItem('session') || '').session_id;
  
    if (sessionId) {
      this.auth.logout(sessionId).subscribe(
        (response) => {
          // Handle successful logout, such as clearing session-related data
          console.log('Logout successful', response);
          // Clear session-related data from sessionStorage
          sessionStorage.removeItem('session');
        },
        (error) => {
          // Handle logout error
          console.error('Logout error', error);
        }
      );
    } else {
      console.error('Session ID not found in session storage.');
    }
  }
  
  searchTerm = '';
  searchResults: any[] = [];

 

  // search(): void {
  //   this.auth.searchKeyword(this.searchTerm)
  //     .subscribe(response => {
  //       this.searchResults = response.results;
  //     });
  // }
}