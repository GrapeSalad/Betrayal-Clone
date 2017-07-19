import { Component, OnInit } from '@angular/core';
import {Character} from '../character.model';
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
      console.log(dataLastEmittedFromObserver[2]);
    })
    this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
      this.chosenEvent = dataLastEmittedFromObserver;
      console.log(this.chosenEvent);
    })
    this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
      this.chosenOmen = dataLastEmittedFromObserver;
      console.log(this.chosenOmen);
    })
    this.gameService.getRoomTileById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
      this.chosenRoom = dataLastEmittedFromObserver;
      console.log(this.chosenRoom);
    })
  }

}
