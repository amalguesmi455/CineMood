import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { ThemeComponent } from './theme/theme.component';
import { SectionComponent } from './section/section.component';
import { BannerComponent } from './banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilmsComponent } from './films/films.component';
import { SerieComponent } from './serie/serie.component';
import { MoodComponent } from './mood/mood.component';
import { CommonModule } from '@angular/common';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FavoritetvComponent } from './favoritetv/favoritetv.component';
import { WatchmovieComponent } from './watchmovie/watchmovie.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ListemoviesComponent } from './listemovies/listemovies.component';
import { ReviewsserieComponent } from './reviewsserie/reviewsserie.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    HeroComponent,
    ThemeComponent,
    SectionComponent,
    BannerComponent,
    FilmsComponent,
    SerieComponent,
    MoodComponent,
    CelebritiesComponent,
    WatchlistComponent,
    FavoritetvComponent,
    WatchmovieComponent,
    ReviewsComponent,
    ListemoviesComponent,
    ReviewsserieComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
