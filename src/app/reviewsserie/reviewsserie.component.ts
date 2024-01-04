import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilmService } from '../service/film.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviewsserie',
  templateUrl: './reviewsserie.component.html',
  styleUrls: ['./reviewsserie.component.css']
})
export class ReviewsserieComponent {
  isFavoritesClicked: boolean = false;
  isWatchlistClicked: boolean = false;
  serieId: any;
  serie: any;
  genres: any[] = [];
  cast: any[] = [];
  trailers: any[] = [];
  recommendedMovies: any[] = [];
 
  constructor(private route: ActivatedRoute, private movieService: FilmService, private sanitizer:DomSanitizer) {  
    this.fetchCastData(); ;}
 
    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.serieId = +params['id'];
    
        this.movieService.getSerieDetails(this.serieId).subscribe((data) => {
          this.serie = data;
          console.log(data);
        });
    
        // Fetch genres
        this.movieService.getGenresS().subscribe((data) => {
          this.genres = data.genres;
        });
    
        // Fetch credits (cast and crew)
        this.movieService.getMovieCreditsS(this.serieId).subscribe((data) => {
          this.cast = data.cast; // Assuming 'cast' is an array of cast members
          // Process crew data if needed
        });
    
        // Fetch trailers
        this.movieService.getMovieTrailersS(this.serieId).subscribe((data) => {
          this.trailers = data.results; 
        });
    
        // Fetch recommended movies
        this.movieService.getRecommendedMoviesS(this.serieId).subscribe((data) => {
          this.recommendedMovies = data.results; // Assuming 'results' is an array of recommended movies
          // Process recommended movies data if needed
        });
    
        this.movieService.getMovieVideosS(this.serieId).subscribe((videosData: any) => {
          console.log(videosData);
    
    
          if (videosData.results && videosData.results.length > 0) {
            this.trailers = videosData.results[0].key;
            console.log(this.trailers);
          }
        });
      });
    }
    

  addToWatchlist(serieId: number) {
    const accountInfo = JSON.parse(sessionStorage.getItem('account') || '{}');
    const accountId = accountInfo.id || ''; // Assuming 'id' is the key for accountId

    if (!accountId) {
      // Handle the case where accountId is not available
      console.error('Account ID not found in session storage.');
        }
       console.log(accountId);

    this.movieService.addToWatchlist(serieId , accountId).subscribe((response) => {
      console.log('Added to watchlist:', response);
    },(er: any) => {
      console.log(er);
      
    });
    
    this.isWatchlistClicked = !this.isWatchlistClicked;
  }

  getSafeVideoUrl(): SafeResourceUrl {
    const videoUrl = 'https://www.youtube.com/embed/' + this.trailers;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  addToFavorites(serieId: number) {
    // Retrieve accountId from session storage
    const accountInfo = JSON.parse(sessionStorage.getItem('account') || '{}');
    const accountId = accountInfo.id || ''; // Assuming 'id' is the key for accountId

    if (!accountId) {
      // Handle the case where accountId is not available
      console.error('Account ID not found in session storage.');
        }
       console.log(accountId);

     this.movieService.addToFavorites(serieId, accountId).subscribe((res: any) => {
      console.log(res);
      
    },(er: any) => {
      console.log(er);
      
    });
    this.isFavoritesClicked = !this.isFavoritesClicked; 
  }
 
  getGenreName(genreId: number): string {
    return this.genres[genreId] || 'Unknown Genre';
  }
 
 
 
 
  showAllCast: boolean = false;
 
  fetchCastData() {
    this.movieService.getMovieCreditsS(this.serieId).subscribe((data) => {
      this.cast = data.cast; 

    });
  }
 
  toggleShowAllCast() {
    this.showAllCast = !this.showAllCast;
  }
 
  circumference: number = 100;
  strokeOffset: number = 0;
 
  calculateCircleAttributes() {
    if (this.serie.vote_average) {
      const percentage = this.serie.vote_average * 10;
      this.strokeOffset = this.circumference - (percentage / 100) * this.circumference;
    }
  }
}
 