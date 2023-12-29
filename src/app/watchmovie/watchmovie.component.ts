import { Component } from '@angular/core';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-watchmovie',
  templateUrl: './watchmovie.component.html',
  styleUrls: ['./watchmovie.component.css']
})
export class WatchmovieComponent {

  favoriteMovies: any[] = [];
  accountId: string = 'your_account_id'; 

  constructor(private filmService: FilmService) {}

  ngOnInit() {
  
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies() {
    const accountInfo = JSON.parse(sessionStorage.getItem('account') || '{}');
    const accountId = accountInfo.id || '';

    if (!accountId) {
      // Handle the case where accountId is not available
      console.error('Account ID not found in session storage.');
        }
       console.log(accountId);

    this.filmService.getFavoriteWatch(accountId).subscribe((movies: any) => {
      
      this.favoriteMovies = movies.results;
      console.log(movies);
    });
  }
}