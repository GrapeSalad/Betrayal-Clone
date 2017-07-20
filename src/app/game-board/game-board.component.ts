import { Component, OnInit } from '@angular/core';
import {Character} from '../character.model';
import {Room} from '../room.model';
import {Router} from '@angular/router';
import {GameService} from '../game.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  providers: [GameService]
})
export class GameBoardComponent implements OnInit {
  staticRoomTiles;
  roomTiles;
  roomTileArr: Room[] = [];
  randomGroundRoomTiles: any[] = [];
  randomUpperRoomTiles: any[] = [];
  randomBasementRoomTiles: any[] = [];
  basementLanding = false;
  entranceHall;
  foyer;
  grandStaircase;
  chosenEvent;
  chosenOmen;
  chosenRoom;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getStaticRoomTiles().subscribe(dataLastEmittedFromObserver => {
      this.staticRoomTiles = dataLastEmittedFromObserver;
      this.entranceHall = dataLastEmittedFromObserver[2];
      this.foyer = dataLastEmittedFromObserver[3];
      this.grandStaircase = dataLastEmittedFromObserver[4];
    })
    this.gameService.getRoomTiles().subscribe(dataLastEmittedFromObserver => {
      this.roomTiles = dataLastEmittedFromObserver;
      for(var i=0; i < dataLastEmittedFromObserver.length; i++) {
        this.roomTileArr.push(new Room(dataLastEmittedFromObserver[i].name, dataLastEmittedFromObserver[i].basement, dataLastEmittedFromObserver[i].ground, dataLastEmittedFromObserver[i].upper, dataLastEmittedFromObserver[i].eventCard, dataLastEmittedFromObserver[i].omenCard, dataLastEmittedFromObserver[i].itemCard, dataLastEmittedFromObserver[i].topDoor, dataLastEmittedFromObserver[i].bottomDoor, dataLastEmittedFromObserver[i].leftDoor, dataLastEmittedFromObserver[i].rightDoor, dataLastEmittedFromObserver[i].text));
      }
      for(var i=0; i<40;i++){
        var randomNumber = this.gameService.getRandomNumber(0, (this.roomTileArr.length-1));
        var removed = this.roomTileArr.splice(randomNumber, 1);
        if(removed[0].ground){
          this.randomGroundRoomTiles.push(removed);
        }
        else if(removed[0].basement){
          //for showing the basement landing tile always
          // if(removed[0].name === "Basement Landing"){
          //   this.basementLanding = true;
          //   this.randomBasementRoomTiles.push(removed);
          // }
          // else{
            this.randomBasementRoomTiles.push(removed);
          // }
        }
        else{
          this.randomUpperRoomTiles.push(removed);
        }
      }
    })
    this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
      this.chosenEvent = dataLastEmittedFromObserver;
    })
    this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
      this.chosenOmen = dataLastEmittedFromObserver;
    })
    this.gameService.getRoomTileById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
      this.chosenRoom = dataLastEmittedFromObserver;
    })
  }

  // randomizeRoomTiles() {
  //   // console.log(this.roomTileArr);
  //   // this.roomTileArr
  //   // randomIndex.getRandomNumber(0,(this.roomTileArr.length-1))
  //
  //   for(var i=0; i<this.roomTileArr.length;i++){
  //     var randomNumber = this.gameService.getRandomNumber(0, (this.roomTileArr.length-1));
  //     this.randomizedRoomTiles.push(this.roomTileArr[randomNumber]);
  //     this.roomTileArr.splice(randomNumber, 1);
  //   }
  //   console.log(this.randomizedRoomTiles);
  // }

}
