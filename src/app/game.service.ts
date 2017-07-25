import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { EventCard } from './event-card.model';
import { OmenCard } from './omen-card.model';
import { Haunt } from './haunt.model';
import { Room } from './room.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class GameService {
  staticRoomTiles: FirebaseListObservable<any[]>;
  selectedCharacter: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.staticRoomTiles = database.list('stationary-rooms');
    this.selectedCharacter = database.list('selectedCharacters');
  }

  getStaticRoomTiles(){
    return this.staticRoomTiles;
  }

  getRoomTiles(){
    return this.database.object('/rooms/')
  }

  getEventCardById(cardId: number) {
    return this.database.object('/event-cards/' + cardId)
  }

  getOmenCardById(cardId: number) {
    return this.database.object('/omen-cards/' + cardId)
  }

  getRoomTileById(cardId: number) {
    return this.database.object('/rooms/' + cardId)
  }

  getRandomNumber(min: number, max: number): number{
    return (Math.random() * (max - min +1) | 0) + min;
  }

  diceToRoll(num: number){
    var dieRoll: number = 0;
    for(var i=0; i<num; i++){
      var randNum = this.getRandomNumber(0,2)
      dieRoll += randNum;
      console.log(i + " die roll: " + randNum);
    }
    console.log("total die roll: " + dieRoll);
    return dieRoll;
  }

  getEventCardEffects(cardId: string, speed: number = null, might: number = null, sanity: number = null, knowledge: number = null, numberOfOmenCardsDrawn: number = null){
    var damageDone: any[] = [];
    var chosenTrait: number;
    if(speed != null){
      chosenTrait = speed;
    }
    else if(might != null){
      chosenTrait = might;
    }
    else if(sanity != null){
      chosenTrait = sanity;
    }
    else{
      chosenTrait = knowledge;
    }
    if(Number(cardId) === 15){
      var roll: number = this.diceToRoll(2);
      if(roll === 4){
        damageDone.push("sanity", 1);
      }
      else if(roll === 3){
        damageDone.push("knowledge", 1);
      }
      else{//NOTE:STREATCH GOOOOAAAALLLS to add mental/physical damage
        damageDone.push("sanity", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 1){
      damageDone.push("sanity", -1);
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 2){
      damageDone.push("speed", -1);
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 0){
      var roll: number = this.diceToRoll(speed);
      if(roll >= 4){
        damageDone.push("speed", 1);
      }
      else if(roll >= 1){
        damageDone.push("might", -1);
      }
      else{
        damageDone.push("might", -1);
        damageDone.push("speed", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 3){
      var roll: number = this.diceToRoll(1);
      //should be mental damage
      damageDone.push("sanity", -roll);
      var roll1: number = this.diceToRoll(sanity);
      if(roll1 >= 5){
        damageDone.push("knowledge", 1);
      }
      else{
        var roll2: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 4){
      //add choice for speed or sanity
      var roll: number = this.diceToRoll(speed);
      if(roll >= 4){
        damageDone.push("speed", 1);
      } else if(roll >= 1){
        var roll1: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("speed", -roll1);
      }
      else{
        var roll2: number = this.diceToRoll(2);
        //should be physical damage
        damageDone.push("speed", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 5){
      var roll: number = this.diceToRoll(speed);
      if(roll >= 5){
        damageDone.push("speed", 1);
      } else if(roll >= 2){
        var roll1: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll1);
      }
      else{
        var roll3: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("speed", -roll3);
        var roll2: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("sanity", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 6){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 1 && roll <=3){
        var roll1: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll1);
      }
      else{
        var roll1: number = this.diceToRoll(2);
        //should be mental damage
        damageDone.push("sanity", -roll1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 7){
      var roll: number = this.diceToRoll(knowledge);
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      }
      else{
        damageDone.push("sanity", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 8){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        console.log("move to entrance hall");
        //move to entrance hall
      }
      else{
        var roll1: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("might", -roll1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 9){
      var roll: number = this.diceToRoll(knowledge);
      if(roll >= 5){
        damageDone.push("knowledge", 1);
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        var roll1: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("speed", -roll1);
      }
      else{
        var roll2: number = this.diceToRoll(2);
        //should be physical damage
        damageDone.push("speed", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 10){
      var roll: number = this.diceToRoll(6);
      if(roll >= numberOfOmenCardsDrawn){
        damageDone.push("sanity", 1);
      }
      else{
        var roll1: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 11){
      damageDone.push("knowledge", 1);
      return damageDone;
    }
    else if(Number(cardId) === 12){
      //if in the gardens, roll 2 fewer die
      var roll: number = this.diceToRoll(knowledge);
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      }
      else{
        //computer roll Might 4 attack
        var roll1: number = this.diceToRoll(4);
        //player roll
        var roll2: number = this.diceToRoll(might);
        if (roll1 > roll2) {
          damageDone.push("might", -(roll1-roll2));
        }
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 13){
      var roll: number = this.diceToRoll(sanity);
      if(roll >=1 && roll <= 3){
        var roll1: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("sanity", -roll1);
      }
      else if(roll === 0){
          var roll2: number = this.diceToRoll(2);
          //should be mental damage
          damageDone.push("sanity", -roll2);
        }

      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 14){
      var roll: number = this.diceToRoll(knowledge);
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 16){
      //choose any trait to roll
      var roll: number = this.diceToRoll(chosenTrait);
      if(roll >= 4){
        damageDone.push(chosenTrait, 1);
      } else{
        console.log("trait drops to its lowest value before 0");
        //trait drops to its lowest value before 0
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 17){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 5){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        damageDone.push("might", -1);
      } else if(roll >= 1){
        damageDone.push("might", -1);
        damageDone.push("speed", -1);
      }
      else{
        damageDone.push("might", -1);
        damageDone.push("speed", -1);
        damageDone.push("knowledge", -1);
        damageDone.push("sanity", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 18){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        damageDone.push("sanity", -1);
      }
      else{
        damageDone.push("sanity", -1);
        damageDone.push("might", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 19){
      var sanityRoll: number = this.diceToRoll(sanity);
      var knowledgeRoll: number = this.diceToRoll(knowledge);
      var speedRoll: number = this.diceToRoll(speed);
      var mightRoll: number = this.diceToRoll(might);
      if(sanityRoll >= 2 && knowledgeRoll >= 2 && speedRoll >= 2 && mightRoll >= 2){
        damageDone.push(chosenTrait, 1);
      } else if(sanityRoll >= 2 || knowledgeRoll >= 2 || speedRoll >= 2 || mightRoll >= 2){
        console.log("nothing happens");
      } else if(sanityRoll < 1){
        damageDone.push("sanity", -1);
      } else if(mightRoll < 1){
        damageDone.push("might", -1);
      } else if(speedRoll < 1){
        damageDone.push("speed", -1);
      } else {
        damageDone.push("knowledge", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 20){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        damageDone.push("sanity", -1);
      }
      else{
        damageDone.push("sanity", -1);
        damageDone.push("might", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 21){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 5){
        damageDone.push("sanity", 1);
      } else if(roll >= 1){
        damageDone.push("sanity", -1);
      }
      else{
        damageDone.push("sanity", -2);
      }
      console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 22){
      var roll: number = this.diceToRoll(2);
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      } else{
        console.log("draw an event card");
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 23){
      var roll: number = this.diceToRoll(sanity);
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        damageDone.push("sanity", -1);
      } else {
        damageDone.push("sanity", -1);
        damageDone.push("might", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 24){
      var roll: number = this.diceToRoll(knowledge);
      if(roll >= 5){
        damageDone.push("knowledge", 1);
      }
      console.log(damageDone);
      return damageDone;
    }
  }

}
