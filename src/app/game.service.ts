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
      dieRoll += this.getRandomNumber(0,2);
    }
    return dieRoll;
  }

  //NOTE: Event cards that SUCK: Whoops(1), Smoke(2), The Walls(18)
  getEventCardEffects(cardId: string){
    var damageDone: any[] = [];
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
    else if(Number(cardId) === 0){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSpeed);
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
      //NOTE: should be mental damage
      damageDone.push("sanity", -roll);
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
      if(roll >= 5){
        //draw an item card
        // damageDone.push("speed", 1);
      }
      else{
        var roll: number = this.diceToRoll(1);
        //NOTE: should be mental damage
        damageDone.push("knowledge", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 4){
      //add choice for speed or sanity
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSpeed);
      if(roll >= 4){
        damageDone.push("speed", 1);
      } else if(roll >= 1){
        var roll: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("speed", -roll));
      }
      else{
        var roll: number = this.diceToRoll(2);
        //should be physical damage
        damageDone.push("speed", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 5){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSpeed);
      if(roll >= 5){
        damageDone.push("speed", 1);
      } else if(roll >= 2){
        var roll: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll));
      }
      else{
        var roll: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("speed", -roll);
        var roll: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("sanity", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 6){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
      if(roll >= 4){
        //you resist the sound
      } else if(roll >= 1){
        var roll: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll));
      }
      else{
        var roll: number = this.diceToRoll(2);
        //should be mental damage
        damageDone.push("sanity", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 7){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentKnowledge);
      if(roll >= 4){
        //draw an item card
      }
      else{
        damageDone.push("sanity", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 8){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        //move to entrance hall
      }
      else{
        var roll: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("might", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 9){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentKnowledge);
      if(roll >= 5){
        //draw 2 item cards
      } else if(roll >= 2){
        var roll: number = this.diceToRoll(1);
        //should be physical damage
        damageDone.push("speed", -roll);
      }
      else{
        var roll: number = this.diceToRoll(2);
        //should be physical damage
        damageDone.push("speed", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 10){
      var roll: number = this.diceToRoll(6);
      if(roll >= this.numberOfOmenCardsDrawn){
        damageDone.push("sanity", 1);
      }
      else{
        var roll: number = this.diceToRoll(1);
        //should be mental damage
        damageDone.push("knowledge", -roll);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 11){
      //draw 1 item card
    }
    else if(Number(cardId) === 12){
      //if in the gardens, roll 2 fewer die
      var roll: number = this.diceToRoll(this.selectedCharacter.currentKnowledge);
      if(roll >= 4){
        //draw an item card
      }
      else{
        //computer roll Might 4 attack
        var roll: number = this.diceToRoll(4);
        //player roll
        var roll2: number = this.diceToRoll(this.selectedCharacter.currentMight);
        if (roll > roll2) {
          damageDone.push("might", -(roll-roll2);
        } else
        //nothing happens
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 13){
      //each explorer in the basement must attempt a sanity roll
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
      if(roll >= 4){
        //all is well. nothing happens
      } else if(roll >= 1){
        if (this.currentRoomTile.eventCard) {
          var roll: number = this.diceToRoll(2);
          //should be mental damage
          damageDone.push("sanity", -roll);
        } else {
          var roll: number = this.diceToRoll(1);
          //should be mental damage
          damageDone.push("sanity", -roll);
        }
      }
      else{
        if (this.currentRoomTile.eventCard) {
          var roll: number = this.diceToRoll(3);
          //should be mental damage
          damageDone.push("sanity", -roll);
        } else {
          var roll: number = this.diceToRoll(1);
          //should be mental damage
          damageDone.push("sanity", -roll);
        }
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 14){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentKnowledge);
      if(roll >= 4){
        //draw 1 item card
      } else{
        //nothing happens
      }
    }
    else if(Number(cardId) === 16){
      //choose any trait to roll
      var roll: number = this.diceToRoll(this.selectedCharacter.selectedTrait.current#);
      if(roll >= 4){
        damageDone.push("selectedTrait", 1);
      } else{
        //trait drops to its lowest value before 0
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 17){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
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
    else if(Number(cardId) === 19){
      var sanityRoll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
      var knowledgeRoll: number = this.diceToRoll(this.selectedCharacter.currentKnowledge);
      var speedRoll: number = this.diceToRoll(this.selectedCharacter.currentSpeed);
      var mightRoll: number = this.diceToRoll(this.selectedCharacter.currentMight);
      if(sanityRoll >= 2 && knowledgeRoll >= 2 && speedRoll >= 2 && mightRoll >= 2){
        damageDone.push(this.selectedTrait, 1);
      } else if(sanityRoll >= 2 || knowledgeRoll >= 2 || speedRoll >= 2 || mightRoll >= 2){
        //nothing happens
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
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
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
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
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
        //draw an item card
      } else{
        //draw an event card
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 23){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentSanity);
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        damageDone.push("sanity", -1);
      }
      else{
        //attack a monster or explorer closest to you
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 24){
      var roll: number = this.diceToRoll(this.selectedCharacter.currentKnowledge);
      if(roll >= 5){
        damageDone.push("knowledge", 1);
      } else{
        //nothing
      }
      console.log(damageDone);
      return damageDone;
    }
  }

}
