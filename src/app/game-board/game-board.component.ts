import { Component, OnInit, HostListener, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {CharacterService} from '../character.service';
import {Character} from '../character.model';
import {Speed} from '../speed.model';
import {Might} from '../might.model';
import {Knowledge} from '../knowledge.model';
import {Sanity} from '../sanity.model';
import {Room} from '../room.model';
import {Router} from '@angular/router';
import {GameService} from '../game.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Observable} from 'rxjs/Rx';
// import scrollToElement from 'scroll-to-element';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  host: {'(document:keydown)': 'handleKeyboardEvent($event)'},
  providers: [GameService, CharacterService]
})


export class GameBoardComponent implements OnInit {
  staticRoomTiles;
  entranceHall;
  foyer;
  grandStaircase;
  chosenEvent;
  chosenOmen;
  key;
  currentRoomTileArray: any[] = [];
  currentRoomTileId;
  startScreen: boolean = true;
  groundShow: boolean = true;
  upstairsShow: boolean = false;
  basementShow: boolean = false;
  selectedCharacters: Character[] = [];
  selectedCharacter;
  selectedFriend;
  cardId;
  currentSanityIndex: any = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  currentKnowledgeIndex: any = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  currentMightIndex: any = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  currentSpeedIndex: any = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  rollSanity: boolean = false;
  rollSpeed: boolean = false;
  rollMight: boolean = false;
  rollKnowledge: boolean = false;
  statAffectedArray;
  hauntCounter: number = 0;
  hauntCard;
  hauntWin: boolean = false;
  hauntLose: boolean = false;
  haunt: boolean = false;
  hauntInfo: boolean = false;
  death: boolean = false;
  omenShow: boolean = false;
  omenShowDraw: boolean = false;
  omenShowCard: boolean = false;
  eventShow: boolean = false;
  eventShowDraw: boolean = false;
  eventShowCard: boolean = false;
  directionShow: boolean = true;
  groundToUpstairs: boolean = false;
  hitWall: boolean = false;
  upstairsToGround: boolean = false;
  groundToBasement: boolean = false;
  basementToGround: boolean = false;
  dieRoll: number = 0;
  showDieRoll: boolean = false;
  burielRoomId;
  buriedFriendLife: number = 0;
  movesRemaining: number = 18;
  move: boolean = false;
  hauntDieRoll: number = 0;


constructor(private database: AngularFireDatabase, private gameService: GameService, private characterService: CharacterService, private route: ActivatedRoute) { }

  getDieRoll(){
    this.showDieRoll = true;
    setTimeout(()=>{this.showDieRoll = false;}, 6000);
    var d = document.getElementsByClassName("dice-image");
    d[0].classList.remove("diceImageFlash");
    this.move = true;
    console.log("getDieRoll method call- roll = " + this.dieRoll);
    if(this.haunt === false){
      // this.dieRoll = this.hauntDieRoll;
      if(this.hauntCounter <= this.hauntDieRoll){
        this.haunt = false;
      }else{
        this.haunt = true;
        this.getHauntInfo();
        this.buryFriend();
      }
    }
  }

  // setShownDieRoll(roll: number){
  //   this.dieRoll = roll;
  // }

  buryFriend(){
    var randNum = this.gameService.getRandomNumber(0,14);
    var basementRooms: any[] = [202, 203, 210, 211, 209, 218, 219, 225, 226, 227, 228, 235, 234, 242, 250];
    this.burielRoomId = basementRooms[randNum];
    var burialRoom = document.getElementById(basementRooms[randNum]);
    burialRoom.classList.add('burialRoom');
    console.log(burialRoom + " is where " + this.selectedFriend.name + " is");
  }

  isFriendAlive(){
    this.buriedFriendLife += 1;
    this.movesRemaining -= 1;
    if(this.buriedFriendLife >= 18){
      this.hauntLose = true;
    }
    console.log(this.buriedFriendLife);
  }

  getHauntInfo(){
    this.hauntInfo = true;
  }

  hideHauntInfo(){
    this.hauntInfo = false;

  }
  setBeginningTile(){
    document.getElementById('39').classList.add('active');
  }

  drawEventCard(){
    if(this.eventShowDraw){
      this.eventShowDraw = false;
      this.eventShowCard = true;
    }
    var d = document.getElementsByClassName("dice-image");
    d[0].classList.add("diceImageFlash");
  }

  drawOmenCard(){

    if(this.omenShowDraw){
      this.omenShowDraw = false;
      this.omenShowCard = true;
    }
    var d = document.getElementsByClassName("dice-image");
    d[0].classList.add("diceImageFlash");
  }

  getOmenCardEffects(cardId: string, speed: number = null, might: number = null, sanity: number = null, knowledge: number = null, numberOfOmenCardsDrawn: number = null){
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
    if(Number(cardId) === 0){
      //hauntRoll
      return damageDone;
    } else if(Number(cardId) === 1){
      //hauntRoll
      damageDone.push("might", 2);
      // console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 2){
      //hauntRoll
      damageDone.push("might", 1);
      damageDone.push("sanity", 1);
      // console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 3){
      //hauntRoll
      damageDone.push("might", -1);
      // console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 4){
      //hauntRoll
      damageDone.push("might", 2);
      damageDone.push("sanity", -1);
      // console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 5){
      //hauntRoll
      damageDone.push("knowledge", 1);
      damageDone.push("sanity", 1);
      // console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 6){
      //hauntRoll
      damageDone.push("knowledge", 2);
      // console.log(damageDone);
      return damageDone;
    } else if(Number(cardId) === 7){
      //hauntRoll
      damageDone.push("sanity", 2);
      // console.log(damageDone);
      return damageDone;
    }
    console.log("getOmenCardEffects method call- roll = " + this.dieRoll);
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
      var roll: number = this.gameService.diceToRoll(2);
      this.dieRoll = roll;
      if(roll === 4){
        damageDone.push("sanity", 1);
      }
      else if(roll === 3){
        damageDone.push("knowledge", 1);
      }
      else{//NOTE:STREATCH GOOOOAAAALLLS to add mental/physical damage
        damageDone.push("sanity", -1);
      }
      // console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 1){
      damageDone.push("sanity", -1);
      // console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 2){
      damageDone.push("speed", -1);
      // console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 0){
      var roll: number = this.gameService.diceToRoll(speed);
      this.dieRoll = roll;
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
      // console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 3){
      var roll: number = this.gameService.diceToRoll(1);
      this.dieRoll = roll;
      //should be mental damage
      damageDone.push("sanity", -roll);
      var roll1: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll1;
      if(roll1 >= 5){
        damageDone.push("knowledge", 1);
      }
      else{
        var roll2: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll2;
        //should be mental damage
        damageDone.push("knowledge", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 4){
      //add choice for speed or sanity
      var roll: number = this.gameService.diceToRoll(speed);
      this.dieRoll = roll;
      if(roll >= 4){
        damageDone.push("speed", 1);
      } else if(roll >= 1){
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
        //should be physical damage
        damageDone.push("speed", -roll1);
      }
      else{
        var roll2: number = this.gameService.diceToRoll(2);

        this.dieRoll = roll2;
        //should be physical damage
        damageDone.push("speed", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 5){
      var roll: number = this.gameService.diceToRoll(speed);
      this.dieRoll = roll;
      if(roll >= 5){
        damageDone.push("speed", 1);
      } else if(roll >= 2){
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
        //should be mental damage
        damageDone.push("knowledge", -roll1);
      }
      else{
        var roll3: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll3;
        //should be physical damage
        damageDone.push("speed", -roll3);
        var roll2: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll2;
        //should be mental damage
        damageDone.push("sanity", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 6){
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
      if(roll >= 1 && roll <=3){
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
        //should be mental damage
        damageDone.push("knowledge", -roll1);
      }
      else if(roll > 3){
        console.log("resist");
      }
      else{
        var roll2: number = this.gameService.diceToRoll(2);

        this.dieRoll = roll2;
        //should be mental damage
        damageDone.push("sanity", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 7){
      var roll: number = this.gameService.diceToRoll(knowledge);
      this.dieRoll = roll;
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
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
      if(roll >= 4){
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        // console.log("move to entrance hall");
        //move to entrance hall
      }
      else{
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
        //should be physical damage
        damageDone.push("might", -roll1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 9){
      var roll: number = this.gameService.diceToRoll(knowledge);
      this.dieRoll = roll;
      if(roll >= 5){
        damageDone.push("knowledge", 1);
        damageDone.push("sanity", 1);
      } else if(roll >= 2){
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
        //should be physical damage
        damageDone.push("speed", -roll1);
      }
      else{
        var roll2: number = this.gameService.diceToRoll(2);

        this.dieRoll = roll2;
        //should be physical damage
        damageDone.push("speed", -roll2);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 10){
      var roll: number = this.gameService.diceToRoll(6);
      this.dieRoll = roll;
      if(roll >= numberOfOmenCardsDrawn){
        damageDone.push("sanity", 1);
      }
      else{
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
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
      var roll: number = this.gameService.diceToRoll(knowledge);
      this.dieRoll = roll;
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      }
      else{
        //computer roll Might 4 attack
        var roll1: number = this.gameService.diceToRoll(4);

        this.dieRoll = roll1;
        //player roll
        var roll2: number = this.gameService.diceToRoll(might);

        this.dieRoll = roll2;
        if (roll1 > roll2) {
          damageDone.push("might", -(roll1-roll2));
        }
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 13){
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
      if(roll >=1 && roll <= 3){
        var roll1: number = this.gameService.diceToRoll(1);

        this.dieRoll = roll1;
        //should be mental damage
        damageDone.push("sanity", -roll1);
      }
      else if(roll === 0){
          var roll2: number = this.gameService.diceToRoll(2);

          this.dieRoll = roll2;
          //should be mental damage
          damageDone.push("sanity", -roll2);
        }

      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 14){
      var roll: number = this.gameService.diceToRoll(knowledge);
      this.dieRoll = roll;
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      }
      // console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 16){
      damageDone.push("knowledge", -1);
      return damageDone;
    }
    else if(Number(cardId) === 17){
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
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
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
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
      var sanityRoll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = sanityRoll;
      var knowledgeRoll: number = this.gameService.diceToRoll(knowledge);
      this.dieRoll = knowledgeRoll;
      var speedRoll: number = this.gameService.diceToRoll(speed);
      this.dieRoll = speedRoll;
      var mightRoll: number = this.gameService.diceToRoll(might);
      this.dieRoll = mightRoll;
      if(sanityRoll >= 2 && knowledgeRoll >= 2 && speedRoll >= 2 && mightRoll >= 2){
        damageDone.push(chosenTrait, 1);
      }
      if(sanityRoll < 2){
        damageDone.push("sanity", -1);
      }
      if(knowledgeRoll < 2){
        damageDone.push("knowledge", -1);
      }
      if(speedRoll < 2){
        damageDone.push("speed", -1);
      }
      if(mightRoll < 2){
        damageDone.push("might", -1);
      }
      console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 20){
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
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
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
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
      var roll: number = this.gameService.diceToRoll(2);
      this.dieRoll = roll;
      if(roll >= 4){
        damageDone.push("knowledge", 1);
      } else{
        // console.log("draw an event card");
      }
      // console.log(damageDone);
      return damageDone;
    }
    else if(Number(cardId) === 23){
      var roll: number = this.gameService.diceToRoll(sanity);
      this.dieRoll = roll;
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
      var roll: number = this.gameService.diceToRoll(knowledge);
      this.dieRoll = roll;
      if(roll >= 5){
        damageDone.push("knowledge", 1);
      }
      // console.log(damageDone);
      return damageDone;
    }
    console.log("getEventCardEffects method call- roll = " + this.dieRoll);
  }

  omenCardResolution(){
    this.omenShow = true;
    this.omenShowDraw = true;
    this.omenShowCard = false;
    this.eventShow = false;
    this.eventShowCard = false;
    this.eventShowDraw = true;
    this.directionShow = false;
    if(this.haunt === false){
      this.hauntCounter += 1;
      this.hauntDieRoll = this.gameService.diceToRoll(6);
      this.dieRoll = this.hauntDieRoll;
    }
    console.log(this.haunt + " haunt after roll");
    this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
      this.chosenOmen = dataLastEmittedFromObserver;
      console.log("omen card: " + this.chosenOmen.omen);
      console.log("omen card: " + this.chosenOmen.description);
      this.cardId = dataLastEmittedFromObserver.$key;
      this.statAffectedArray = this.getOmenCardEffects(this.cardId);
      // console.log("stat affected array " + this.statAffectedArray);
      var stat = this.statAffectedArray[0];
      var amount = this.statAffectedArray[1];
      if(stat === "sanity"){
        console.log("omen sanity " + this.currentSanityIndex);

        if((this.currentSanityIndex <= 0 || (this.currentSanityIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('sanity');
        tag.getElementsByClassName(this.currentSanityIndex)[0].classList.remove('highlighted');
        if((this.haunt === false || this.haunt === true) && this.currentSanityIndex + amount > 8){
          this.currentSanityIndex = 8;
        }else if(this.haunt === false && (this.currentSanityIndex + amount < 1)){
          this.currentSanityIndex = 1;
        }
        else{
          this.currentSanityIndex += Number(amount);
        }
        // console.log("currentSanityIndex: " + this.currentSanityIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentSanityIndex)[0].classList.add('highlighted');
        }
        console.log("omen sanity after " + this.currentSanityIndex);
        if(this.currentSanityIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
      else if(stat === "speed"){
        console.log("omen speed " + this.currentSpeedIndex);
       if((this.currentSpeedIndex <= 0 || (this.currentSpeedIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('speed');
        tag.getElementsByClassName(this.currentSpeedIndex)[0].classList.remove('highlighted');
        if((this.haunt === false || this.haunt === true) && this.currentSpeedIndex + amount > 8){
          this.currentSpeedIndex = 8;
        }else if(this.haunt === false && (this.currentSpeedIndex + amount < 1)){
          this.currentSpeedIndex = 1;
        }
        else{
          this.currentSpeedIndex += Number(amount);
        }
        // console.log("currentSpeedIndex: " + this.currentSpeedIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentSpeedIndex)[0].classList.add('highlighted');
        }
        console.log("omen speed after " + this.currentSpeedIndex);
        if(this.currentSpeedIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
      else if(stat === "might"){
        console.log("omen might " + this.currentMightIndex);
        if((this.currentMightIndex <= 0 || (this.currentMightIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('might');
        tag.getElementsByClassName(this.currentMightIndex)[0].classList.remove('highlighted');
        if((this.haunt === true || this.haunt === false) && this.currentMightIndex + amount > 8){
          this.currentMightIndex = 8;
        }else if(this.haunt === false && (this.currentMightIndex + amount < 1)){
          this.currentMightIndex = 1;
        }
        else{
          this.currentMightIndex += Number(amount);
        }
        // console.log("currentMightIndex: " + this.currentMightIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentMightIndex)[0].classList.add('highlighted');
        }
        console.log("omen might after " + this.currentMightIndex);
        if(this.currentMightIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
      else if(stat === "knowledge"){
        console.log("omen knowledge " + this.currentKnowledgeIndex);
        if((this.currentKnowledgeIndex <= 0 || (this.currentKnowledgeIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('knowledge');
        tag.getElementsByClassName(this.currentKnowledgeIndex)[0].classList.remove('highlighted');
        if((this.haunt === true || this.haunt === false) && this.currentKnowledgeIndex + amount > 8){
          this.currentKnowledgeIndex = 8;
        }else if(this.haunt === false && (this.currentKnowledgeIndex + amount < 1)){
          this.currentKnowledgeIndex = 1;
        }
        else{
          this.currentKnowledgeIndex += Number(amount);
        }
        // console.log("currentKnowledgeIndex: " + this.currentKnowledgeIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentKnowledgeIndex)[0].classList.add('highlighted');
        }
        console.log("omen knowledge after " + this.currentKnowledgeIndex);
        if(this.currentKnowledgeIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
    })
  }

  eventCardResolution(){
    this.eventShow = true;
    this.eventShowDraw = true;
    this.eventShowCard = false;
    this.omenShow = false;
    this.omenShowCard = false;
    this.omenShowDraw = true;
    this.directionShow = false;
    this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
      this.chosenEvent = dataLastEmittedFromObserver;
      console.log("event card: " + this.chosenEvent.event);
      console.log("event card: " + this.chosenEvent.description);
      this.cardId = dataLastEmittedFromObserver.$key;
      if(this.chosenEvent.sanity){
        this.rollSanity = true;
        this.statAffectedArray = this.getEventCardEffects(this.cardId, 0, 0, this.selectedCharacter.sanity.statArray[this.currentSanityIndex], 0);
      }
      else if(this.chosenEvent.speed){
        this.rollSpeed = true;
        this.statAffectedArray = this.getEventCardEffects(this.cardId,  this.selectedCharacter.speed.statArray[this.currentSpeedIndex], 0, 0, 0);
      }
      else if(this.chosenEvent.might){
        this.rollMight = true;
        this.statAffectedArray = this.getEventCardEffects(this.cardId, 0, this.selectedCharacter.might.statArray[this.currentMightIndex],  0, 0);
      }
      else if(this.chosenEvent.knowledge){
        this.rollKnowledge = true;
        this.statAffectedArray = this.getEventCardEffects(this.cardId, 0, 0, 0, this.selectedCharacter.knowledge.statArray[this.currentKnowledgeIndex]);
      }
      else{
        this.statAffectedArray = this.getEventCardEffects(this.cardId);
      }
      // console.log("stat affected array " + this.statAffectedArray);
      var stat = this.statAffectedArray[0];
      var amount = this.statAffectedArray[1];
      if(stat === "sanity"){
        console.log("event sanity " + this.currentSanityIndex);
        if((this.currentSanityIndex <= 0 || (this.currentSanityIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('sanity');
        tag.getElementsByClassName(this.currentSanityIndex)[0].classList.remove('highlighted');
        if((this.haunt === true || this.haunt === false) && this.currentSanityIndex + amount > 8){
          this.currentSanityIndex = 8;
        }else if(this.haunt === false && (this.currentSanityIndex + amount < 1)){
          this.currentSanityIndex = 1;
        }
        else{
          this.currentSanityIndex += Number(amount);
        }
        // console.log("currentSanityIndex: " + this.currentSanityIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentSanityIndex)[0].classList.add('highlighted');
        }
        console.log("event sanity after " + this.currentSanityIndex);
        if(this.currentSanityIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
      else if(stat === "speed"){
        console.log("event speed " + this.currentSpeedIndex);
        if((this.currentSpeedIndex <= 0 || (this.currentSpeedIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('speed');
        tag.getElementsByClassName(this.currentSpeedIndex)[0].classList.remove('highlighted');
        if((this.haunt === true || this.haunt === false) && this.currentSpeedIndex + amount > 8){
          this.currentSpeedIndex = 8;
        }else if(this.haunt === false && (this.currentSpeedIndex + amount < 1)){
          this.currentSpeedIndex = 1;
        }
        else{
          this.currentSpeedIndex += Number(amount);
        }
        // console.log("currentSpeedIndex: " + this.currentSpeedIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentSpeedIndex)[0].classList.add('highlighted');
        }
        console.log("event speed after " + this.currentSpeedIndex);
        if(this.currentSpeedIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
      else if(stat === "might"){
        console.log("event might " + this.currentMightIndex);
        if((this.currentMightIndex <= 0 || (this.currentMightIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('might');
        tag.getElementsByClassName(this.currentMightIndex)[0].classList.remove('highlighted');
        if((this.haunt === true || this.haunt === false) && this.currentMightIndex + amount > 8){
          this.currentMightIndex = 8;
        }else if(this.haunt === false && (this.currentMightIndex + amount < 1)){
          this.currentMightIndex = 1;
        }
        else{
          this.currentMightIndex += Number(amount);
        }
        // console.log("currentMightIndex: " + this.currentMightIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentMightIndex)[0].classList.add('highlighted');
        }
        console.log("event might after " + this.currentMightIndex);
        if(this.currentMightIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
      else if(stat === "knowledge"){
        console.log("event knowledge " + this.currentKnowledgeIndex);
        if((this.currentKnowledgeIndex <= 0 || (this.currentKnowledgeIndex + amount < 1)) && this.haunt === true){
          console.log("dead? " + this.death);
          this.death = true;
        }
        var tag = document.getElementById('knowledge');
        tag.getElementsByClassName(this.currentKnowledgeIndex)[0].classList.remove('highlighted');
        if((this.haunt === true || this.haunt === false) && this.currentKnowledgeIndex + amount > 8){
          this.currentKnowledgeIndex = 8;
        }else if(this.haunt === false && (this.currentKnowledgeIndex + amount < 1)){
          this.currentKnowledgeIndex = 1;
        }
        else{
          this.currentKnowledgeIndex += Number(amount);
        }
        // console.log("currentKnowledgeIndex: " + this.currentKnowledgeIndex);
        if(this.death === false){
          tag.getElementsByClassName(this.currentKnowledgeIndex)[0].classList.add('highlighted');
        }
        console.log("event knowledge after " + this.currentKnowledgeIndex);
        if(this.currentKnowledgeIndex <=0 && this.haunt === true){
          this.death = true;
        }
      }
    })
  }

  handleKeyboardEvent(event: KeyboardEvent){
    this.key = event.which || event.keyCode;
    const element = document.getElementsByClassName("active");

    if(this.startScreen === false){
      const element = document.getElementById(this.currentRoomTileId);
      element.scrollIntoView(false);
    }

    //enter Key to start game
    if(this.key === 13 && this.startScreen === false && !this.haunt){
      //do nothing dood
    }
    else if(this.key === 13){
      this.startScreen = false;
      this.move = true;
      setTimeout(()=>{var tag = document.getElementById('knowledge');
      tag.getElementsByClassName(this.currentKnowledgeIndex)[0].classList.add('highlighted');
      var tag = document.getElementById('speed');
      tag.getElementsByClassName(this.currentSpeedIndex)[0].classList.add('highlighted');
      var tag = document.getElementById('might');
      tag.getElementsByClassName(this.currentMightIndex)[0].classList.add('highlighted');
      var tag = document.getElementById('sanity');
      tag.getElementsByClassName(this.currentSanityIndex)[0].classList.add('highlighted');}, 300)

      if(this.haunt === false) {
        setTimeout(()=>{this.setBeginningTile()}, 300);
      }
      //haunt stuff
      if (this.haunt === true && this.currentRoomTileId === this.burielRoomId) {
        console.log("WIN");
        this.hauntWin = true;
      }

    }
    if(this.death === true && (this.key === 37 || this.key === 38 || this.key === 39 || this.key === 40)){
      console.log("it is the " + this.death + " death");
    }
    else{
      //go downstairs from upper landing
      if(this.move === true){
      if(this.currentRoomTileId === 95 && this.key === 13){
        element[0].scrollIntoView(false);
        this.currentRoomTileId = 37;
        this.groundShow = true;
        this.upstairsShow = false;
        setTimeout(()=>{document.getElementById('39').classList.remove('active')}, 301);
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('95').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          // this.scrollToElement();
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          // this.scrollToElement('.active');
        }
      }
      //up to foyer from basement stairs
      if(this.currentRoomTileId === 201){
        this.basementToGround = true;
      }
      if(this.key === 38 && this.currentRoomTileId === 201){
        element[0].scrollIntoView(false);
        this.groundToBasement = false;
        this.basementToGround = false;
        this.currentRoomTileId = 38;
        this.groundShow = true;
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('201').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
        }
      }
      //up
      else if(this.key === 38 && (this.currentRoomTileId === 37 || this.currentRoomTileId === 32 || this.currentRoomTileId === 23 || this.currentRoomTileId === 22 || this.currentRoomTileId === 21 || this.currentRoomTileId === 81 || this.currentRoomTileId === 48 || this.currentRoomTileId === 87 || this.currentRoomTileId === 88 || this.currentRoomTileId === 104 || this.currentRoomTileId === 203 || this.currentRoomTileId === 202 || this.currentRoomTileId === 225 || this.currentRoomTileId === 228 || this.currentRoomTileId === 38)){
        this.hitWall = true;
        setTimeout(()=>{this.hitWall = false;}, 5000);
      }
      else if(this.key === 38){
        this.groundToUpstairs = false;
        this.currentRoomTileId -= 8;
        element[0].scrollIntoView(false);
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('39').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        }
        if(this.currentRoomTileId === 31){
          this.currentRoomTileArray[0].classList.add('bloodyRoom');
        }
        else if(this.currentRoomTileId === 23){
          if(!this.currentRoomTileArray[0].classList.contains('graveyard')){
            this.currentRoomTileArray[0].classList.add('graveyard');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 22){
          if(!this.currentRoomTileArray[0].classList.contains('ballroom')){
            this.currentRoomTileArray[0].classList.add('ballroom');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 46){
          if(!this.currentRoomTileArray[0].classList.contains('statuaryCorridor')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('statuaryCorridor');
          }
        }
        else if(this.currentRoomTileId === 87){
          if(!this.currentRoomTileArray[0].classList.contains('operatingLaboratory')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('operatingLaboratory');
          }
        }
        else if(this.currentRoomTileId === 97){
          if(!this.currentRoomTileArray[0].classList.contains('balcony')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('balcony');
          }
        }
        else if(this.currentRoomTileId === 89){
          this.currentRoomTileArray[0].classList.add('creakyHallway');
        }
        else if(this.currentRoomTileId === 81){
          if(!this.currentRoomTileArray[0].classList.contains('attic')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('attic');
          }
        }
        else if(this.currentRoomTileId === 218){
          if(!this.currentRoomTileArray[0].classList.contains('catacombs')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('catacombs');
          }
        }
        else if(this.currentRoomTileId === 219){
          this.currentRoomTileArray[0].classList.add('wineCellar');
        }
        else if(this.currentRoomTileId === 210){
          if(!this.currentRoomTileArray[0].classList.contains('servantsQuarters')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('servantsQuarters');
          }
        }
        else if(this.currentRoomTileId === 211){
          if(!this.currentRoomTileArray[0].classList.contains('furnaceRoom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('furnaceRoom');
          }
        }
        else if(this.currentRoomTileId === 202){
          if(!this.currentRoomTileArray[0].classList.contains('organRoom')){
            this.currentRoomTileArray[0].classList.add('organRoom');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 203){
          if(!this.currentRoomTileArray[0].classList.contains('gymnasium')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('gymnasium');
          }
        }
        else if(this.currentRoomTileId === 201){
          this.currentRoomTileArray[0].classList.add('stairsFromBasement');
        }
      }

      //down to the basement from the coal coalChute
        if(this.currentRoomTileId === 55){
        this.currentRoomTileId = 226;
        this.groundToBasement = true;
        this.groundShow = false;
        this.basementShow = true;
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('39').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        }
        if(this.currentRoomTileId === 226){
          this.currentRoomTileArray[0].classList.add("basementLanding");
        }
      }
      //down
      else if(this.key === 40 && (this.currentRoomTileId === 29 || this.currentRoomTileId === 37 || this.currentRoomTileId === 62 || this.currentRoomTileId === 56 || this.currentRoomTileId === 32 || this.currentRoomTileId === 30 || this.currentRoomTileId === 88 || this.currentRoomTileId === 104 || this.currentRoomTileId === 113 || this.currentRoomTileId === 119 || this.currentRoomTileId === 209 || this.currentRoomTileId === 228 || this.currentRoomTileId === 225 || this.currentRoomTileId === 235 || this.currentRoomTileId === 250)){
        this.hitWall = true;
        setTimeout(()=>{this.hitWall = false;}, 5000);
      }
      else if(this.key === 40){
        this.currentRoomTileId += 8;
        element[0].scrollIntoView(true);
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('39').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
        }
        if(this.currentRoomTileId === 29){
          if(!this.currentRoomTileArray[0].classList.contains('conservatory')){
            this.currentRoomTileArray[0].classList.add('conservatory');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 46){
          if(!this.currentRoomTileArray[0].classList.contains('statuaryCorridor')){
            this.currentRoomTileArray[0].classList.add('statuaryCorridor');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 54){
          if(!this.currentRoomTileArray[0].classList.contains('gameRoom')){
            this.currentRoomTileArray[0].classList.add('gameRoom');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 62){
          if(!this.currentRoomTileArray[0].classList.contains('kitchen')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('kitchen');
          }
        }
        else if(this.currentRoomTileId === 47){
          if(!this.currentRoomTileArray[0].classList.contains('abandonedRoom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('abandonedRoom');
          }
        }
        else if(this.currentRoomTileId === 55){
          this.currentRoomTileArray[0].classList.add('coalChute');
        }
        else if(this.currentRoomTileId === 56){
          if(!this.currentRoomTileArray[0].classList.contains('gardens')){
            this.currentRoomTileArray[0].classList.add('gardens');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 97){
          if(!this.currentRoomTileArray[0].classList.contains('balcony')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('balcony');
          }
        }
        else if(this.currentRoomTileId === 103){
          if(!this.currentRoomTileArray[0].classList.contains('charredRoom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('charredRoom');
          }
        }
        else if(this.currentRoomTileId === 111){
          if(!this.currentRoomTileArray[0].classList.contains('gallery')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('gallery');
          }
        }
        else if(this.currentRoomTileId === 119){
          this.currentRoomTileArray[0].classList.add('storeroom');
        }
        else if(this.currentRoomTileId === 105){
          this.currentRoomTileArray[0].classList.add('collapsedRoom');
        }
        else if(this.currentRoomTileId === 113){
          if(!this.currentRoomTileArray[0].classList.contains('chapel')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('chapel');
          }
        }
        else if(this.currentRoomTileId === 234){
          this.currentRoomTileArray[0].classList.add('larder');
        }
        else if(this.currentRoomTileId === 235){
          if(!this.currentRoomTileArray[0].classList.contains('crypt')){
            this.currentRoomTileArray[0].classList.add('crypt');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 242){
          if(!this.currentRoomTileArray[0].classList.contains('researchLaboratory')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('researchLaboratory');
          }
        }
        else if(this.currentRoomTileId === 250){
          if(!this.currentRoomTileArray[0].classList.contains('vault')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('vault');
          }
        }
        else if(this.currentRoomTileId === 227){
          this.currentRoomTileArray[0].classList.add('dustyHallway');
        }
        else if(this.currentRoomTileId === 219){
          this.currentRoomTileArray[0].classList.add('wineCellar');
        }
        else if(this.currentRoomTileId === 218){
          if(!this.currentRoomTileArray[0].classList.contains('catacombs')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('catacombs');
          }
        }
      }

      //right
      if(this.key === 39 && (this.currentRoomTileId === 22 || this.currentRoomTileId === 23 || this.currentRoomTileId === 29 || this.currentRoomTileId === 32 || this.currentRoomTileId === 39 || this.currentRoomTileId === 46 || this.currentRoomTileId === 48 || this.currentRoomTileId === 56 || this.currentRoomTileId === 55 || this.currentRoomTileId === 54 || this.currentRoomTileId === 62 || this.currentRoomTileId === 81 || this.currentRoomTileId === 89 || this.currentRoomTileId === 97 || this.currentRoomTileId === 95 || this.currentRoomTileId === 105 || this.currentRoomTileId === 113 || this.currentRoomTileId === 111 || this.currentRoomTileId === 119 || this.currentRoomTileId === 201 || this.currentRoomTileId === 202 || this.currentRoomTileId === 203 || this.currentRoomTileId === 211 || this.currentRoomTileId === 218 || this.currentRoomTileId === 219 || this.currentRoomTileId === 228 || this.currentRoomTileId === 235 || this.currentRoomTileId === 234 || this.currentRoomTileId === 242 || this.currentRoomTileId === 250)){
        this.hitWall = true;
        setTimeout(()=>{this.hitWall = false;}, 5000);
      }
      else if(this.key === 39){
        this.groundToUpstairs = false;
        this.currentRoomTileId += 1;
        element[0].scrollIntoView(false);
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('39').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        }
        if(this.currentRoomTileId === 32){
          if(!this.currentRoomTileArray[0].classList.contains('library')){
            this.currentRoomTileArray[0].classList.add('library');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 48){
          if(!this.currentRoomTileArray[0].classList.contains('patio')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('patio');
          }
        }
        else if(this.currentRoomTileId === 88){
          if(!this.currentRoomTileArray[0].classList.contains('tower')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('tower');
          }
        }
        else if(this.currentRoomTileId === 89){
          this.currentRoomTileArray[0].classList.add('creakyHallway');
        }
        else if(this.currentRoomTileId === 104){
          if(!this.currentRoomTileArray[0].classList.contains('bedroom')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('bedroom');
          }
        }
        else if(this.currentRoomTileId === 105){
          this.currentRoomTileArray[0].classList.add('collapsedRoom');
        }
        else if(this.currentRoomTileId === 106){
          if(!this.currentRoomTileArray[0].classList.contains('masterBedroom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('masterBedroom');
          }
        }
        //basement
        else if(this.currentRoomTileId === 227){
          this.currentRoomTileArray[0].classList.add('dustyHallway');
        }
        else if(this.currentRoomTileId === 228){
          this.currentRoomTileArray[0].classList.add('chasm');
        }
        else if(this.currentRoomTileId === 211){
          if(!this.currentRoomTileArray[0].classList.contains('furnaceRoom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('furnaceRoom');
          }
        }
      }

      //left movement to upstairs from grand staircase
      if(this.currentRoomTileId === 37){
        this.groundToUpstairs = true;
      }
      if(this.key === 37 && this.currentRoomTileId === 37){
        element[0].scrollIntoView(false);
        this.groundToUpstairs = false;
        this.groundShow = false;
        this.upstairsShow = true;
        this.currentRoomTileId = 95;
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('37').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
        }
        if(this.currentRoomTileId === 95){
          this.currentRoomTileArray[0].classList.add("upperLanding");
        }
      }
      //left
      else if(this.key === 37 && (this.currentRoomTileId === 21 || this.currentRoomTileId === 23 || this.currentRoomTileId === 29 || this.currentRoomTileId === 30 || this.currentRoomTileId === 54 || this.currentRoomTileId === 46 || this.currentRoomTileId === 62 || this.currentRoomTileId === 56 || this.currentRoomTileId === 55 || this.currentRoomTileId === 81 || this.currentRoomTileId === 87 || this.currentRoomTileId === 95 || this.currentRoomTileId === 103 || this.currentRoomTileId === 111 || this.currentRoomTileId === 119 || this.currentRoomTileId === 113 || this.currentRoomTileId === 97 || this.currentRoomTileId === 201 || this.currentRoomTileId === 209 || this.currentRoomTileId === 218 || this.currentRoomTileId === 202 || this.currentRoomTileId === 203 || this.currentRoomTileId === 219 || this.currentRoomTileId === 225 || this.currentRoomTileId === 234 || this.currentRoomTileId === 235 || this.currentRoomTileId === 242 || this.currentRoomTileId === 250 || this.currentRoomTileId === 47)){
        this.hitWall = true;
        setTimeout(()=>{this.hitWall = false;}, 5000);
      }
      else if(this.key === 37){
        this.currentRoomTileId -= 1;
        element[0].scrollIntoView(false);
        if (this.currentRoomTileArray.length === 0) {
          document.getElementById('39').classList.remove('active');
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        } else {
          this.currentRoomTileArray[0].classList.remove('active');
          this.currentRoomTileArray = [];
          this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId));
          this.currentRoomTileArray[0].classList.add('active');
          if(this.haunt === true){
            this.isFriendAlive();
          }
        }
        if(this.currentRoomTileId === 30){
          if(!this.currentRoomTileArray[0].classList.contains('diningRoom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('diningRoom');
          }
        }
        else if(this.currentRoomTileId === 21){
          if(!this.currentRoomTileArray[0].classList.contains('junkroom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('junkroom');
          }
        }
        else if(this.currentRoomTileId === 87){
          if(!this.currentRoomTileArray[0].classList.contains('operatingLaboratory')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('operatingLaboratory');
          }
        }
        else if(this.currentRoomTileId === 88){
          if(!this.currentRoomTileArray[0].classList.contains('tower')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('tower');
          }
        }
        else if(this.currentRoomTileId === 103){
          if(!this.currentRoomTileArray[0].classList.contains('charredRoom')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('charredRoom');
          }
        }
        else if(this.currentRoomTileId === 104){
          if(!this.currentRoomTileArray[0].classList.contains('bedroom')){
            this.move = false;
            this.eventCardResolution();
            this.currentRoomTileArray[0].classList.add('bedroom');
          }
        }
        //basement
        else if(this.currentRoomTileId === 210){
          if(!this.currentRoomTileArray[0].classList.contains('servantsQuarters')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('servantsQuarters');
          }
        }
        else if(this.currentRoomTileId === 209){
          if (!this.currentRoomTileArray[0].classList.contains('undergroundLake')){
            this.currentRoomTileArray[0].classList.add('undergroundLake');
            this.move = false;
            this.eventCardResolution();
          }
        }
        else if(this.currentRoomTileId === 225){
          if(!this.currentRoomTileArray[0].classList.contains('pentagramChamber')){
            this.move = false;
            this.omenCardResolution();
            this.currentRoomTileArray[0].classList.add('pentagramChamber');
          }
        }
      }
    }
  }
  }

  getCharacterById(charId: string){
    return this.database.object('/selectedCharacters/' + charId);
  }


  //NOTE:need to remove old characters from database on new game?
  ngOnInit() {
    this.currentRoomTileId = 39;
    this.characterService.getSelectedCharacters().subscribe(dataLastEmittedFromObserver =>{
      if(dataLastEmittedFromObserver.length > 2){
        for(var i=0; i < (dataLastEmittedFromObserver.length-2); i++){
          var charToRemove = this.getCharacterById(dataLastEmittedFromObserver[i].$key);
          charToRemove.remove();
        }
      }
      this.selectedCharacter = dataLastEmittedFromObserver[dataLastEmittedFromObserver.length-2];
      this.selectedFriend = dataLastEmittedFromObserver[dataLastEmittedFromObserver.length-1];
      this.currentSanityIndex = dataLastEmittedFromObserver[dataLastEmittedFromObserver.length-2].sanity.initialIndex;
      this.currentKnowledgeIndex = dataLastEmittedFromObserver[dataLastEmittedFromObserver.length-2].knowledge.initialIndex;
      this.currentSpeedIndex = dataLastEmittedFromObserver[dataLastEmittedFromObserver.length-2].speed.initialIndex;
      this.currentMightIndex = dataLastEmittedFromObserver[dataLastEmittedFromObserver.length-2].might.initialIndex;
    })

    this.gameService.getHaunt().subscribe(dataLastEmittedFromObserver =>{
      this.hauntCard = dataLastEmittedFromObserver[0];
    })

    this.gameService.getStaticRoomTiles().subscribe(dataLastEmittedFromObserver => {
      this.staticRoomTiles = dataLastEmittedFromObserver;
      this.entranceHall = dataLastEmittedFromObserver[0];
      this.foyer = dataLastEmittedFromObserver[1];
      this.grandStaircase = dataLastEmittedFromObserver[2];
    })

  }

}
