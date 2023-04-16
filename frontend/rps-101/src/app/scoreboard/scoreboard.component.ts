import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {

  @Input() round : number = 0;

  @Input() rounds : string[][] = [];


  ngOnInit(): void {
    for(var i: number = 0; i < 5; i++) {
      this.rounds[i] = [];
      for(var j: number = 0; j< 3; j++) {
          this.rounds[i][j] = '';

   }
    }
  }

  checkId(valor: string): string{

    if(valor.length == 0){
      return "no-card";
    }else{
      if(valor === "WIN"){
        return "victory";
      }else if(valor === "LOSE"){
        return "lose";
      }else{
        return "draw";
      }
    }
  }

  checkCardId(valor: string, player: number): string{

      if(player === 1 && valor === "WIN"){
        return "win";
      }else if (player === 2 && valor === "LOSE"){
        return "win";
      }else if (player === 1 && valor === "LOSE"){
        return "lost";
      }else if (player === 2 && valor === "WIN"){
        return "lost";
      }else{
        return "lost";
      }

    }

    tooltipName(name : string) : string {
      if(name === "t.v."){
        return "T.V.";
      }else if(name === "u.f.o"){
        return "U.F.O";
      }else if( name === "video game"){
        return "Video Game";
      }
       let firstChar =  name.charAt(0).toUpperCase();
        return firstChar+ name.slice(1);
    }

    tooltipRound(name : string) : string {
      name = name.toLowerCase();
      let firstChar =  name.charAt(0).toUpperCase();
      return firstChar+ name.slice(1);


    }



}
