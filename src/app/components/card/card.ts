import { Component, inject, input, Input, OnDestroy, signal } from '@angular/core';
import { LeagueData } from '../../models/league-data';
import { LeaguesService } from '../../services/leagues-service';
import { Subscription } from 'rxjs';
import { SeasonBadgeData } from '../../models/season-badge-data';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnDestroy {
  leagueData = input.required<LeagueData>();

  protected isCardFlipped = signal(false);
  protected badgeData = signal<SeasonBadgeData | null>(null);

  private leagueService = inject(LeaguesService);
  private subsArray: Array<Subscription> = [];

  ngOnDestroy(): void {
    this.subsArray.forEach((sub) => sub.unsubscribe());
  }

  fetchSeasonBadge(id: string) {
    this.isCardFlipped.set(!this.isCardFlipped());
    if (this.badgeData()) {
      return;
    }

    const sub = this.leagueService.getSeasonBadgeFor(id).subscribe(({ seasons }) => {
      this.badgeData.set(seasons[0]);
    });
    this.subsArray.push(sub);
  }
}
