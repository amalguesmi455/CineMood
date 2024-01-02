// theme.component.ts
import { Component } from '@angular/core';
import { FilmService } from '../service/film.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent {

  constructor(private movieService: FilmService, private router: Router) {}

  // theme.component.ts
theme(mood: number): void {
 
     
  this.router.navigate([`/mood/${mood}`]);

   
}


currentTheme: string = '';



  resetTheme() {
    this.currentTheme = '';
  }

}
