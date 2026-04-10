import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Card } from '../card/card';
import { LeaguesService } from '../../services/leagues-service';
import { Subscription } from 'rxjs';
import { LeagueData } from '../../models/league-data';

@Component({
  selector: 'app-home-page',
  imports: [Card],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  private leaguesService = inject(LeaguesService);
  private subsArray: Array<Subscription> = [];

  protected allLeagues = signal<Array<LeagueData>>([]);

  ngOnInit(): void {
    this.fetchAllLeagues();
  }

  ngOnDestroy(): void {
    this.subsArray.forEach((sub) => sub.unsubscribe());
  }

  private fetchAllLeagues(): void {
    const sub = this.leaguesService.getAllLeagues().subscribe(({ leagues }) => {
      this.allLeagues.set(leagues);
    });

    // Push subscription to array so it can be unsubbed when component destroyed.
    this.subsArray.push(sub);
  }
}
