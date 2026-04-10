import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllLeaguesResponse } from '../models/all-leagues.response';
import { SeasonsBadgeResponse } from '../models/seasons-badge.response';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  private http = inject(HttpClient);

  getAllLeagues(): Observable<AllLeaguesResponse> {
    return this.http.get<AllLeaguesResponse>(
      'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php',
    );
  }

  getSeasonBadgeFor(id: string): Observable<SeasonsBadgeResponse> {
    return this.http.get<SeasonsBadgeResponse>(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`,
    );
  }
}
