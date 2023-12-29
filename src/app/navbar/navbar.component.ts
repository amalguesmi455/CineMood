import { Component } from '@angular/core';
import { FilmService } from '../service/film.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  
  trendingItems: any[] = [];
  timeWindow: string = 'week'; // You can change this to 'day' or 'week' based on your needs

  constructor(private trendingService: FilmService) {}

  ngOnInit() {
    this.getTrendingData();
  }

  getTrendingData() {
    this.trendingService.getTrending(this.timeWindow).subscribe((data) => {
      this.trendingItems = data.results;
      console.log('Trending Data:', this.trendingItems);
      // Handle data or update UI accordingly
    });
  }

}
