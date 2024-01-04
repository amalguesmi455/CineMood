import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FilmsComponent } from './films/films.component';
import { SerieComponent } from './serie/serie.component';
import { ThemeComponent } from './theme/theme.component';
import { MoodComponent } from './mood/mood.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FavoritetvComponent } from './favoritetv/favoritetv.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WatchmovieComponent } from './watchmovie/watchmovie.component';
import { ListemoviesComponent } from './listemovies/listemovies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReviewsserieComponent } from './reviewsserie/reviewsserie.component';

const routes: Routes = [
  {path:"",component :HomeComponent},
  {path:"login",component :LoginComponent},
  {path:"films",component :FilmsComponent},
  {path:"serie",component :SerieComponent},
  {path:"theme",component :ThemeComponent},
  {path:"mood/:mood",component :MoodComponent},
  {path:"Popular",component :CelebritiesComponent},
  {path:"favorite",component :WatchlistComponent},
  {path:"favoritetv",component :FavoritetvComponent},
  {path:"review/:id",component :ReviewsComponent},
  {path:"watch",component :WatchmovieComponent},
  {path:"home",component :NavbarComponent},
  {path:"reviewserie/:id",component :ReviewsserieComponent},
  { path: 'listMovies/:search', component: ListemoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
