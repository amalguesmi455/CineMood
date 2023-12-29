// movie-reviews.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FilmService } from '../service/film.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  movieId: any;
  movie: any; // Your movie details structure
  genres: any[] = [];
  cast: any[] = [];
  trailers: any[] = [];
  recommendedMovies: any[] = [];
 
  constructor(private route: ActivatedRoute, private movieService: FilmService, private sanitizer:DomSanitizer) {  
    this.fetchCastData(); ;}
 
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.movieId = +params['id'];
    
        this.movieService.getMovieDetails(this.movieId).subscribe((data) => {
          this.movie = data;
          console.log(data);
        });
    
        // Fetch genres
        this.movieService.getGenres().subscribe((data) => {
          this.genres = data.genres;
        });
    
        // Fetch credits (cast and crew)
        this.movieService.getMovieCredits(this.movieId).subscribe((data) => {
          this.cast = data.cast; // Assuming 'cast' is an array of cast members
          // Process crew data if needed
        });
    
        // Fetch trailers
        this.movieService.getMovieTrailers(this.movieId).subscribe((data) => {
          this.trailers = data.results; // Assuming 'results' is an array of trailers
          // Process trailers data if needed
        });
    
        // Fetch recommended movies
        this.movieService.getRecommendedMovies(this.movieId).subscribe((data) => {
          this.recommendedMovies = data.results; // Assuming 'results' is an array of recommended movies
          // Process recommended movies data if needed
        });
    
        this.movieService.getMovieVideos(this.movieId).subscribe((videosData: any) => {
          console.log(videosData);
          if (videosData.results && videosData.results.length > 0) {
            this.trailers = videosData.results[0].key;
          }
        });
      });
    }
    
  addToWatchlist(movieId: number) {
    const accountInfo = JSON.parse(sessionStorage.getItem('account') || '{}');
    const accountId = accountInfo.id || ''; // Assuming 'id' is the key for accountId

    if (!accountId) {
      // Handle the case where accountId is not available
      console.error('Account ID not found in session storage.');
        }
       console.log(accountId);

    this.movieService.addToWatchlist(movieId , accountId).subscribe((response) => {
      console.log('Added to watchlist:', response);
    },(er: any) => {
      console.log(er);
      
    });
  }

  getSafeVideoUrl(): SafeResourceUrl {
    const videoUrl = 'https://www.youtube.com/embed/' + this.trailers;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
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
 
  getGenreName(genreId: number): string {
    return this.genres[genreId] || 'Unknown Genre';
  }
 
 
 
 
  showAllCast: boolean = false;
 
  fetchCastData() {
    this.movieService.getMovieCredits(this.movieId).subscribe((data) => {
      this.cast = data.cast; // Assuming 'cast' is an array of cast members
      // Process crew data if needed
    });
  }
 
  toggleShowAllCast() {
    this.showAllCast = !this.showAllCast;
  }
 
  circumference: number = 100;
  strokeOffset: number = 0;
 
  calculateCircleAttributes() {
    if (this.movie.vote_average) {
      const percentage = this.movie.vote_average * 10;
      this.strokeOffset = this.circumference - (percentage / 100) * this.circumference;
    }
  }
}
 