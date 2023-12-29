// mood.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css'],
})
export class MoodComponent implements OnInit {
  @Input() searchResults: any[] = [];
  page: number[] = [1, 1, 1, 1];
  active: number = 0;
  filteredMovies: { results: any[] } = { results: [] };
  constructor(private movieService: FilmService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const moodParam = params['mood'];
      console.log('Mood parameter from URL:', moodParam);

      this.movieService.filterMoviesByMood( params['mood']).subscribe(
        (filteredMovies) => {
          console.log('Filtered Movies:', filteredMovies);
          this.filteredMovies = filteredMovies;
           // Assign the filtered movies to your component property
        },
        (error) => {
          console.error('Error fetching filtered movies:', error);
        }
      );
    });
  }



}
