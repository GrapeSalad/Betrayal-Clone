import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  host: {'(document:keyup)': 'handleKeyboardEvent($event)'},
  providers: [GameService, CharacterService]
})


export class GameBoardComponent implements OnInit {
  staticRoomTiles;
  roomTiles;
  roomTileArr: Room[] = [];
  randomGroundRoomTiles: any[] = [];
  rightToLeftDoorArray: any[] = [];
  randomUpperRoomTiles: any[] = [];
  randomBasementRoomTiles: any[] = [];
  basementLanding = false;
  entranceHall;
  foyer;
  grandStaircase;
  chosenEvent;
  chosenOmen;
  chosenRoom;
  key;
  currentRoomTileArray: any[] = [];
  currentRoomTileId;
  visibleRoomTileArray: any[] = [];
  startScreen: boolean = true;
  groundShow: boolean = true;
  upstairsShow: boolean = false;
  basementShow: boolean = false;
  selectedCharacters: Character[] = [];
  selectedCharacter;
  selectedCharacterId;
  selectedFriend;
  cardId;

constructor(private database: AngularFireDatabase, private gameService: GameService, private characterService: CharacterService) { }

  handleKeyboardEvent(event: KeyboardEvent){
    this.key = event.which || event.keyCode;

    //enter Key to start game
    if(this.key === 13){
      this.startScreen = false;
    }
    //go downstairs from upper landing
    if(this.currentRoomTileId === 95 && this.key === 13){
      this.currentRoomTileId = 37;
      this.groundShow = true;
      this.upstairsShow = false;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('95').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
    }
    //up to foyer from basement stairs
    if(this.key === 38 && this.currentRoomTileId === 201){
      this.currentRoomTileId = 38;
      this.groundShow = true;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('201').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
    }
    //up
    else if(this.key === 38 && (this.currentRoomTileId === 37 || this.currentRoomTileId === 32 || this.currentRoomTileId === 23 || this.currentRoomTileId === 22 || this.currentRoomTileId === 21 || this.currentRoomTileId === 81 || this.currentRoomTileId === 48 || this.currentRoomTileId === 87 || this.currentRoomTileId === 88 || this.currentRoomTileId === 104 || this.currentRoomTileId === 203 || this.currentRoomTileId === 202 || this.currentRoomTileId === 225 || this.currentRoomTileId === 228 || this.currentRoomTileId === 38)){
      console.log("FACEPLANT LOL");
    }
    else if(this.key === 38){
      this.currentRoomTileId -= 8;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('39').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
      if(this.currentRoomTileId === 31){
        this.currentRoomTileArray[0].classList.add('bloodyRoom');
      }
      else if(this.currentRoomTileId === 23){
        if(!this.currentRoomTileArray[0].classList.contains('graveyard')){
          this.currentRoomTileArray[0].classList.add('graveyard');
          this.gameService.getEventCardById(15).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
            this.cardId = dataLastEmittedFromObserver.$key;
            this.selectedCharacter.sanity.initialIndex += Number(this.gameService.getEventCardEffects(this.cardId)[1]);
            console.log(this.selectedCharacter.sanity.initialIndex);
          })
        }
      }
      else if(this.currentRoomTileId === 22){
        if(!this.currentRoomTileArray[0].classList.contains('ballroom')){
          this.currentRoomTileArray[0].classList.add('ballroom');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 46){
        if(!this.currentRoomTileArray[0].classList.contains('statuaryCorridor')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('statuaryCorridor');
        }
      }
      else if(this.currentRoomTileId === 87){
        if(!this.currentRoomTileArray[0].classList.contains('operatingLaboratory')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('operatingLaboratory');
        }
      }
      else if(this.currentRoomTileId === 97){
        if(!this.currentRoomTileArray[0].classList.contains('balcony')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('balcony');
        }
      }
      else if(this.currentRoomTileId === 89){
        this.currentRoomTileArray[0].classList.add('creakyHallway');
      }
      else if(this.currentRoomTileId === 81){
        if(!this.currentRoomTileArray[0].classList.contains('attic')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('attic');
        }
      }
      else if(this.currentRoomTileId === 218){
        if(!this.currentRoomTileArray[0].classList.contains('catacombs')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('catacombs');
        }
      }
      else if(this.currentRoomTileId === 219){
        this.currentRoomTileArray[0].classList.add('wineCellar');
      }
      else if(this.currentRoomTileId === 210){
        if(!this.currentRoomTileArray[0].classList.contains('servantsQuarters')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('servantsQuarters');
        }
      }
      else if(this.currentRoomTileId === 211){
        if(!this.currentRoomTileArray[0].classList.contains('furnaceRoom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('furnaceRoom');
        }
      }
      else if(this.currentRoomTileId === 202){
        if(!this.currentRoomTileArray[0].classList.contains('organRoom')){
          this.currentRoomTileArray[0].classList.add('organRoom');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 203){
        if(!this.currentRoomTileArray[0].classList.contains('gymnasium')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
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
      this.groundShow = false;
      this.basementShow = true;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('39').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
      if(this.currentRoomTileId === 226){
        this.currentRoomTileArray[0].classList.add("basementLanding");
      }
    }
    //down
    else if(this.key === 40 && (this.currentRoomTileId === 29 || this.currentRoomTileId === 37 || this.currentRoomTileId === 62 || this.currentRoomTileId === 56 || this.currentRoomTileId === 32 || this.currentRoomTileId === 30 || this.currentRoomTileId === 88 || this.currentRoomTileId === 104 || this.currentRoomTileId === 113 || this.currentRoomTileId === 119 || this.currentRoomTileId === 209 || this.currentRoomTileId === 228 || this.currentRoomTileId === 225 || this.currentRoomTileId === 235 || this.currentRoomTileId === 250)){
      console.log("FACEPLANT LOL");
    }
    else if(this.key === 40){
      this.currentRoomTileId += 8;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('39').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
      if(this.currentRoomTileId === 29){
        if(!this.currentRoomTileArray[0].classList.contains('conservatory')){
          this.currentRoomTileArray[0].classList.add('conservatory');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 46){
        if(!this.currentRoomTileArray[0].classList.contains('statuaryCorridor')){
          this.currentRoomTileArray[0].classList.add('statuaryCorridor');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 54){
        if(!this.currentRoomTileArray[0].classList.contains('gameRoom')){
          this.currentRoomTileArray[0].classList.add('gameRoom');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 62){
        if(!this.currentRoomTileArray[0].classList.contains('kitchen')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('kitchen');
        }
      }
      else if(this.currentRoomTileId === 47){
        if(!this.currentRoomTileArray[0].classList.contains('abandonedRoom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('abandonedRoom');
        }
      }
      else if(this.currentRoomTileId === 55){
        this.currentRoomTileArray[0].classList.add('coalChute');
      }
      else if(this.currentRoomTileId === 56){
        if(!this.currentRoomTileArray[0].classList.contains('gardens')){
          this.currentRoomTileArray[0].classList.add('gardens');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 97){
        if(!this.currentRoomTileArray[0].classList.contains('balcony')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('balcony');
        }
      }
      else if(this.currentRoomTileId === 103){
        if(!this.currentRoomTileArray[0].classList.contains('charredRoom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('charredRoom');
        }
      }
      else if(this.currentRoomTileId === 111){
        if(!this.currentRoomTileArray[0].classList.contains('gallery')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
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
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('chapel');
        }
      }
      else if(this.currentRoomTileId === 234){
        this.currentRoomTileArray[0].classList.add('larder');
      }
      else if(this.currentRoomTileId === 235){
        if(!this.currentRoomTileArray[0].classList.contains('crypt')){
          this.currentRoomTileArray[0].classList.add('crypt');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 242){
        if(!this.currentRoomTileArray[0].classList.contains('researchLaboratory')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('researchLaboratory');
        }
      }
      else if(this.currentRoomTileId === 250){
        if(!this.currentRoomTileArray[0].classList.contains('vault')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
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
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('catacombs');
        }
      }
    }

    //right
    if(this.key === 39 && (this.currentRoomTileId === 22 || this.currentRoomTileId === 23 || this.currentRoomTileId === 29 || this.currentRoomTileId === 32 || this.currentRoomTileId === 39 || this.currentRoomTileId === 46 || this.currentRoomTileId === 48 || this.currentRoomTileId === 56 || this.currentRoomTileId === 55 || this.currentRoomTileId === 54 || this.currentRoomTileId === 62 || this.currentRoomTileId === 81 || this.currentRoomTileId === 89 || this.currentRoomTileId === 97 || this.currentRoomTileId === 95 || this.currentRoomTileId === 105 || this.currentRoomTileId === 113 || this.currentRoomTileId === 111 || this.currentRoomTileId === 119 || this.currentRoomTileId === 201 || this.currentRoomTileId === 202 || this.currentRoomTileId === 203 || this.currentRoomTileId === 211 || this.currentRoomTileId === 218 || this.currentRoomTileId === 219 || this.currentRoomTileId === 228 || this.currentRoomTileId === 235 || this.currentRoomTileId === 234 || this.currentRoomTileId === 242 || this.currentRoomTileId === 250)){
      console.log("FACEPLANT LOL");
    }
    else if(this.key === 39){
      this.currentRoomTileId += 1;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('39').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
      if(this.currentRoomTileId === 32){
        if(!this.currentRoomTileArray[0].classList.contains('library')){
          this.currentRoomTileArray[0].classList.add('library');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 48){
        if(!this.currentRoomTileArray[0].classList.contains('patio')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('patio');
        }
      }
      else if(this.currentRoomTileId === 88){
        if(!this.currentRoomTileArray[0].classList.contains('tower')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('tower');
        }
      }
      else if(this.currentRoomTileId === 89){
        this.currentRoomTileArray[0].classList.add('creakyHallway');
      }
      else if(this.currentRoomTileId === 104){
        if(!this.currentRoomTileArray[0].classList.contains('bedroom')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('bedroom');
        }
      }
      else if(this.currentRoomTileId === 105){
        this.currentRoomTileArray[0].classList.add('collapsedRoom');
      }
      else if(this.currentRoomTileId === 106){
        if(!this.currentRoomTileArray[0].classList.contains('masterBedroom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
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
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('furnaceRoom');
        }
      }
    }

    //left movement to upstairs from grand staircase
    if(this.key === 37 && this.currentRoomTileId === 37){
      this.groundShow = false;
      this.upstairsShow = true;
      this.currentRoomTileId = 95;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('37').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
      if(this.currentRoomTileId === 95){
        this.currentRoomTileArray[0].classList.add("upperLanding");
      }
    }
    //left
    else if(this.key === 37 && (this.currentRoomTileId === 21 || this.currentRoomTileId === 23 || this.currentRoomTileId === 29 || this.currentRoomTileId === 30 || this.currentRoomTileId === 54 || this.currentRoomTileId === 46 || this.currentRoomTileId === 62 || this.currentRoomTileId === 56 || this.currentRoomTileId === 55 || this.currentRoomTileId === 81 || this.currentRoomTileId === 87 || this.currentRoomTileId === 95 || this.currentRoomTileId === 103 || this.currentRoomTileId === 111 || this.currentRoomTileId === 119 || this.currentRoomTileId === 113 || this.currentRoomTileId === 97 || this.currentRoomTileId === 201 || this.currentRoomTileId === 209 || this.currentRoomTileId === 218 || this.currentRoomTileId === 202 || this.currentRoomTileId === 203 || this.currentRoomTileId === 219 || this.currentRoomTileId === 225 || this.currentRoomTileId === 234 || this.currentRoomTileId === 235 || this.currentRoomTileId === 242 || this.currentRoomTileId === 250 || this.currentRoomTileId === 47)){
      console.log("FACEPLANT LOL");
    }
    else if(this.key === 37){
      this.currentRoomTileId -= 1;
      if (this.currentRoomTileArray.length === 0) {
        document.getElementById('39').classList.remove('active');
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      } else {
        this.currentRoomTileArray[0].classList.remove('active');
        this.currentRoomTileArray = [];
        this.currentRoomTileArray.push(document.getElementById(this.currentRoomTileId))
        this.currentRoomTileArray[0].classList.add('active');
      }
      if(this.currentRoomTileId === 30){
        if(!this.currentRoomTileArray[0].classList.contains('diningRoom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('diningRoom');
        }
      }
      else if(this.currentRoomTileId === 21){
        if(!this.currentRoomTileArray[0].classList.contains('junkroom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('junkroom');
        }
      }
      else if(this.currentRoomTileId === 87){
        if(!this.currentRoomTileArray[0].classList.contains('operatingLaboratory')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('operatingLaboratory');
        }
      }
      else if(this.currentRoomTileId === 88){
        if(!this.currentRoomTileArray[0].classList.contains('tower')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('tower');
        }
      }
      else if(this.currentRoomTileId === 103){
        if(!this.currentRoomTileArray[0].classList.contains('charredRoom')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('charredRoom');
        }
      }
      else if(this.currentRoomTileId === 104){
        if(!this.currentRoomTileArray[0].classList.contains('bedroom')){
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('bedroom');
        }
      }
      //basement
      else if(this.currentRoomTileId === 210){
        if(!this.currentRoomTileArray[0].classList.contains('servantsQuarters')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('servantsQuarters');
        }
      }
      else if(this.currentRoomTileId === 209){
        if (!this.currentRoomTileArray[0].classList.contains('undergroundLake')){
          this.currentRoomTileArray[0].classList.add('undergroundLake');
          this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
        }
      }
      else if(this.currentRoomTileId === 225){
        if(!this.currentRoomTileArray[0].classList.contains('pentagramChamber')){
          this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
            this.chosenEvent = dataLastEmittedFromObserver;
          })
          this.currentRoomTileArray[0].classList.add('pentagramChamber');
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
      // if(dataLastEmittedFromObserver.length === 0) {
      //   this.selectedCharacter = dataLastEmittedFromObserver[0];
      //   this.selectedFriend = dataLastEmittedFromObserver[1];
      // }
      // else{
      //   var charInDatabase = this.getCharacterById(dataLastEmittedFromObserver[0].$key);
      //   var friendInDatabase = this.getCharacterById(dataLastEmittedFromObserver[1].$key);
      //   console.log(dataLastEmittedFromObserver[0]);
      //
      //   // charInDatabase.remove();
      //   // friendInDatabase.remove();
        this.selectedCharacter = dataLastEmittedFromObserver[0];
        this.selectedFriend = dataLastEmittedFromObserver[1];
        console.log(this.selectedCharacter.sanity.statArray);
    })

    this.gameService.getStaticRoomTiles().subscribe(dataLastEmittedFromObserver => {
      this.staticRoomTiles = dataLastEmittedFromObserver;
      this.entranceHall = dataLastEmittedFromObserver[0];
      this.foyer = dataLastEmittedFromObserver[1];
      this.grandStaircase = dataLastEmittedFromObserver[2];
    })

  }

}
