import { Component, HostListener } from '@angular/core';
import { FilmService } from '../service/film.service';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent {
  movies: any[] = [];
  selectedCategory: string = 'now_playing';
  page: number[] = [1, 1, 1, 1];
  active: number = 0;

  constructor(private movieService: FilmService) {
    // Load movies initially
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies('https://api.themoviedb.org/3/movie/now_playing').subscribe((movies: any) => {
      this.movies = movies.results;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
      this.page[this.active]++;
      this.getMoviesByType(this.active);
    }
  }

  getMoviesByType(type: number) {
    const selectedCategory = this.selectedCategory;
    let apiUrl: string;

    switch (selectedCategory) {
      case 'now_playing':
        apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
        break;
      case 'popular':
        apiUrl = 'https://api.themoviedb.org/3/movie/popular';
        break;
      case 'top_rated':
        apiUrl = 'https://api.themoviedb.org/3/movie/top_rated';
        break;
      case 'upcoming':
        apiUrl = 'https://api.themoviedb.org/3/movie/upcoming';
        break;
      default:
        apiUrl = 'https://api.themoviedb.org/3/discover/movie';
        break;
    }

    this.movieService.getMovies(apiUrl).subscribe((movies: any) => {
      

      // Assuming the response has a 'results' property
      this.movies = [...this.movies, ...movies.results];
    });
  }

  filterMovies() {
    this.page[this.active] = 1; // Réinitialiser la page lorsque la catégorie change
    this.movies = []; // Effacer les films existants lors du changement de catégorie
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

     this.movieService.addToFavorites(movieId, accountId).subscribe((res: any) => {
      console.log(res);
      
    },(er: any) => {
      console.log(er);
      
    });
  }

  }

                                                                