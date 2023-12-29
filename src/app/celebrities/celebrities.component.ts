import { Component, HostListener } from '@angular/core';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent {

  Popular: any[] = [];
  page: number[] = [1, 1, 1, 1];
  active: number = 0;

  constructor(private Popularervice: FilmService) {
    // Load Popular initially
    this.loadPopular(this.active);
  }

  loadPopular(active: number) {
    const apiUrl = 'https://api.themoviedb.org/3/person/popular';
  
    this.Popularervice.getPopular(apiUrl, this.page[active]).subscribe((response: any) => {
      console.log(response);
      this.Popular = [...this.Popular, ...response.results];
    });
  }
  
  

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.page[this.active]++;
      this.loadPopular(this.active);
    }
  }

  filterPopular(active: number) {
    this.page[active] = 1; // Reset the page when the category changes
    this.Popular = []; // Clear existing data when the category changes
    this.loadPopular(active);
  }
}
