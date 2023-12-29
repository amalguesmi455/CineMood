import { Component, HostListener } from '@angular/core';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent {
  series: any[] = [];
  filteredseries: any[] = [];
  selectedCategory: string = 'popular';
  page: number[] = [1, 1, 1, 1]; 
  active: number = 0;
  movieService: any;

  constructor(private serieservice: FilmService) {

    this.loadseries();
  }

  loadseries() {
    this.getMoviesByType(this.active);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.page[this.active]++;
      this.getMoviesByType(this.active);
    }
  }

  getMoviesByType(type: number) {
    let apiUrl: string;

    switch (this.selectedCategory) {
      case 'airing_today':
        apiUrl = 'https://api.themoviedb.org/3/tv/airing_today';
        break;
      case 'popular':
        apiUrl = 'https://api.themoviedb.org/3/tv/popular';
        break;
      case 'top_rated':
        apiUrl = 'https://api.themoviedb.org/3/tv/top_rated';
        break;
      case 'On_The_Air':
        apiUrl = 'https://api.themoviedb.org/3/tv/on_the_air';
        break;
      default:
        apiUrl = 'https://api.themoviedb.org/3/tv/popular';
        break;
    }

    this.serieservice.getseries(apiUrl).subscribe((series: any) => {
      console.log(series);

    
      this.series = [...this.series, ...series.results];
    });
  }

  filterseries() {
    
    this.page[this.active] = 1; 
    this.series = []; 
    this.getMoviesByType(this.active);
  }

  addToFavorites(movieId: number) {
    // Retrieve accountId from session storage
    const accountInfo = JSON.parse(sessionStorage.getItem('account') || '{}');
    const accountId = accountInfo.id || ''; // Assuming 'id' is the key for accountId

    if (!accountId) {
      // Handle the case where accountId is not available
      console.error('Account ID not found in session storage.');
        }
       console.log(accountId);

     this.movieService.addToFavorite(movieId, accountId).subscribe((res: any) => {
      console.log(res);
      
    },(er: any) => {
      console.log(er);
      
    });
  }
}
