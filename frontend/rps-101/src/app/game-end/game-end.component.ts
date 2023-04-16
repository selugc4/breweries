import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent {
  @Input() text : string = "";
  @Input() rounds : string[][] = [];

  message: string = "";
  messageActions: string = "";
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
  tooltipRound(name : string) : string {
    name = name.toLowerCase();
    let firstChar =  name.charAt(0).toUpperCase();
    return firstChar+ name.slice(1);


  }

  matchResult(result : string) : string {
    this.message = "Congratulations, you've won your first game of JANKEN 101!"
    this.messageActions = "To continue playing and unlock great advantages such as viewing 101 cards, creating your own decks, and accessing all game modes, please sign up now."
    if(result === "YOU WIN!"){
      return "WIN";
    }else if( result === "YOU LOSE!"){
      return "LOSE";
    }else
      return "DRAW";

  }
}
