import { Component, Input } from '@angular/core';
import { BattleOutcome } from 'app/models/BattleOutcome';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent {
  @Input() roundHistory!: BattleOutcome[];
}
