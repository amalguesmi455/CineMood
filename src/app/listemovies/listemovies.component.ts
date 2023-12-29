import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-listemovies',
  templateUrl: './listemovies.component.html',
  styleUrls: ['./listemovies.component.css']
})
export class ListemoviesComponent {
  constructor(private route: ActivatedRoute, private movieService: FilmService) { }
  movies:any
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
   
      this.movieService.searchMovies(params['search']).subscribe((data) => {
        this.movies = data.results;
        console.log(data);
       
      });
    })
  }
}
