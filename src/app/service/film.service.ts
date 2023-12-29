import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private tmdbDiscoverUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '22f92953c2a60c384a3e808138f7ee2f';
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiUr = 'https://api.themoviedb.org/3';
  private apiBaseUrl = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) { }
  getRequestToken(): Observable<any> {
    const url = `${this.apiUr}/authentication/token/new`;
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(url, { params });
  }

  login(username: string, password: string, requestToken: string): Observable<any> {
    const url = `${this.apiUr}/authentication/token/validate_with_login`;
    const params = new HttpParams().set('api_key', this.apiKey);
    const body = {
      username: username,
      password: password,
      request_token: requestToken
    };

    return this.http.post(url, body,{params});
  }

  filterMoviesByMood(mood: any, page: number = 1): Observable<any> {
     console.log(this.mapMoodToGenre(mood));

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('with_genres', this.mapMoodToGenre(mood));
     console.log(this.mapMoodToGenre(mood));

    return this.http.get<any>(this.tmdbDiscoverUrl, { params });
  }



  searchKeyword(query: string): Observable<any> {
    const url = `${this.apiBaseUrl}/search/keyword?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }


  private mapMoodToGenre(mood: any): string {
    switch (mood) {
      case '1': // Joie/Excitation
        return '35'; // Comedy genre ID
      case '2': // Tristesse/Émotion
        return '18 '; // Drama genre ID
      case '3': // Suspense/Thriller
        return '53'; // Thriller genre ID
      case '4': // Romance/Amour
        return '10749'; // Romance genre ID
      case '5': // Peur/Horreur
        return '27'; // Horror genre ID
      case '6': // Détente/Calme
        return '99'; // Documentary genre ID
      default:
        return '';
    }
  }

  getMovies(apiUrl: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US'); 

    return this.http.get(apiUrl, { params });
  }
  getseries(apiUrl: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US'); 

    return this.http.get(apiUrl, { params });
  }


  getMovieReviews(movieId: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${movieId}/reviews`;
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(url, { params });
  }

  getPopular(apiUrl: string, page: number): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US'); 

    return this.http.get(apiUrl, { params });
  }

  
  addToFavorites(movieId: number, accountId: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    
    const params ={
    api_key: this.apiKey,
    session_id:  JSON.parse(sessionStorage.getItem('session')! ).session_id
  }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    };
    return this.http.post(url, body, { params, headers });
  }
  

  addToFavorite(movieId: number, accountId: string): Observable<any> {
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/tv`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
 
    
    const params ={
    api_key: this.apiKey,
    session_id:  JSON.parse(sessionStorage.getItem('session')! ).session_id
  }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      favorite: true,
    };
    return this.http.post(url, body, { params, headers });
  }


  addToWatchlist(movieId: number,accountId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/account/${accountId}/watchlist`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const params ={
      api_key: this.apiKey,
      session_id:  JSON.parse(sessionStorage.getItem('session')! ).session_id
    }
    const body = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: true,
    };

    return this.http.post(url, body, { params, headers });
  }

  getTrending(timeWindow: string): Observable<any> {
    const url = `${this.apiBaseUrl}/trending/all/${timeWindow}`;
    const params = {
      api_key: this.apiKey
    };

    return this.http.get(url, { params });
  }
  searchMovies(searchTerm: string): Observable<any> {
    console.log(searchTerm);
   
    const url = `https://api.themoviedb.org/3/search/movie`;
    const params = {
      api_key: this.apiKey,
      query: searchTerm
    };
   
    return this.http.get(url, { params });
  }
   
  getMovieVideos(movieId: number): Observable<any> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
  getFavoriteWatch(accountId: string): Observable<any> {
    const apiUrl = `${this.apiBaseUrl}/account/${accountId}/watchlist/movies`;
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('session_id', JSON.parse(sessionStorage.getItem('session')!).session_id);

    return this.http.get(apiUrl, { params });
}
  getFavoriteMovies(accountId: string): Observable<any> {
    const apiUrl = `${this.apiBaseUrl}/account/${accountId}/favorite/movies`;
    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('session_id', JSON.parse(sessionStorage.getItem('session')!).session_id);

    return this.http.get(apiUrl, { params });
}
getFavoritetv(accountId: string): Observable<any> {
  const apiUrl = `${this.apiBaseUrl}/account/${accountId}/favorite/tv`;
  const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('session_id', JSON.parse(sessionStorage.getItem('session')!).session_id);

  return this.http.get(apiUrl, { params });
}


  createSession(requestToken: string): Observable<any> {
    const url = `${this.apiUr}/authentication/session/new`;
    const params = new HttpParams().set('api_key', this.apiKey);
 
    const body = { request_token: requestToken };
 
    return this.http.post<any>(url, body,{params});
  }
 
  getAccountInfo(sessionId: string): Observable<any> {
    const url = `${this.apiUr}/account`;
    const params = { session_id: sessionId, api_key: this.apiKey };
 
    return this.http.get<any>(url, { params });
  }
  logout(sessionId: string): Observable<any> {
    const url = `${this.apiUr}/authentication/session`;
    const params = { session_id: sessionId, api_key: this.apiKey };
 
    return this.http.delete<any>(url, { params });
  }

  getPopularMovies(): Observable<any> {
    const url = `${this.apiBaseUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
 
 
  getUpComing(): Observable<any> {
    const url = `${this.apiBaseUrl}/movie/upcoming?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  getTopRated(): Observable<any> {
    const url = `${this.apiBaseUrl}/movie/top_rated?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
 
  getNow(): Observable<any> {
    const url = `${this.apiBaseUrl}/movie/now_playing?api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
 
  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/genre/movie/list?api_key=${this.apiKey}`);
  }
 
 
   // Fetch cast and crew for a movie by ID
   getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }
 
  // Fetch movie trailers by ID
  getMovieTrailers(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`);
  }
 
  // Fetch recommended movies for a given movie by ID
  getRecommendedMovies(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/movie/${movieId}/recommendations?api_key=${this.apiKey}`);
  }
 
 
  discoverMovies(page=1): Observable<any> {
    const url = `${this.apiBaseUrl}/discover/movie`;
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('page', page);
    return this.http.get(url, { params });
  }
 
 
  getMoviesByGenre(genreId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/discover/movie`;
    const params = { api_key: this.apiKey, with_genres: genreId.toString() };
 
    return this.http.get<any>(url, { params });
  }
 

}