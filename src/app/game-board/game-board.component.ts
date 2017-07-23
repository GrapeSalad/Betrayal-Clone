import { Component, OnInit, HostListener } from '@angular/core';
import {Character} from '../character.model';
import {Room} from '../room.model';
import {Router} from '@angular/router';
import {GameService} from '../game.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  host: {'(document:keyup)': 'handleKeyboardEvent($event)'},
  providers: [GameService]
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
  classToAdd;
  selectedAnchorId: any[] = [];
  characterInEntranceHall = false;

constructor(private gameService: GameService) { }

getIdOfElement(e){
  document.getElementById('39').classList.remove('active');
  if (this.selectedAnchorId.length === 0) {
    this.selectedAnchorId.push(e.currentTarget);
    this.selectedAnchorId[0].classList.add('active');
  }
  if (this.selectedAnchorId.length === 1) {
    this.selectedAnchorId[0].classList.remove('active');
    this.selectedAnchorId = [];
    this.selectedAnchorId.push(e.currentTarget);
    this.selectedAnchorId[0].classList.add('active');
  }
}

  // @HostListener('document:keypress',['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    this.key = event.which || event.keyCode;
    console.log(this.key);

    if(this.key === 13){
      //add class active to entrance hall div(should be static div)
      // event.target.classList.add("active");
      if(this.characterInEntranceHall === false){
        this.characterInEntranceHall = true;
        console.log(this.characterInEntranceHall);
      }
      else{
        this.characterInEntranceHall = false;
        console.log(this.characterInEntranceHall);
      }
    }
    else if(this.key === 37){
      //get active div id
      //remove active class from div id
      //add active class to div on the left eg:(#7) from (#8)
    }
  }
  clicked(event){
    event.target.classList.add("active");
  }

  ngOnInit() {
    this.gameService.getStaticRoomTiles().subscribe(dataLastEmittedFromObserver => {
      this.staticRoomTiles = dataLastEmittedFromObserver;
      this.entranceHall = dataLastEmittedFromObserver[0];
      this.foyer = dataLastEmittedFromObserver[1];
      this.grandStaircase = dataLastEmittedFromObserver[2];
      // console.log(this.entranceHall.src);
    })
  //   this.gameService.getRoomTiles().subscribe(dataLastEmittedFromObserver => {
  //     this.roomTiles = dataLastEmittedFromObserver;
  //     for(var i=0; i < dataLastEmittedFromObserver.length; i++) {
  //       this.roomTileArr.push(new Room(dataLastEmittedFromObserver[i].name, dataLastEmittedFromObserver[i].basement, dataLastEmittedFromObserver[i].ground, dataLastEmittedFromObserver[i].upper, dataLastEmittedFromObserver[i].eventCard, dataLastEmittedFromObserver[i].omenCard, dataLastEmittedFromObserver[i].itemCard, dataLastEmittedFromObserver[i].topDoor, dataLastEmittedFromObserver[i].bottomDoor, dataLastEmittedFromObserver[i].leftDoor, dataLastEmittedFromObserver[i].rightDoor, dataLastEmittedFromObserver[i].text, dataLastEmittedFromObserver[i].src));
  //     }
  //     while(this.roomTileArr.length > 0){
  //       var randomNumber = this.gameService.getRandomNumber(0, (this.roomTileArr.length-1));
  //       // console.log(this.roomTileArr.length);
  //       // while(this.roomTileArr.length > 4) {
  //       //   console.log("hi");
  //       // }
  //       var removed = this.roomTileArr.splice(randomNumber, 1);
  //       if(removed[0].ground){
  //         this.randomGroundRoomTiles.push(removed);
  //       }
  //       else if(removed[0].basement){
  //           this.randomBasementRoomTiles.push(removed);
  //       }
  //       else{
  //         this.randomUpperRoomTiles.push(removed);
  //       }
  //     }
  //     //trying to test left/right pathing
  //     for(i=0; i<this.randomGroundRoomTiles.length; i++) {
  //       if(this.randomGroundRoomTiles[i][0].rightDoor && this.randomGroundRoomTiles[i+1][0].leftDoor){
  //         this.rightToLeftDoorArray.push(this.randomGroundRoomTiles[i]);
  //         for(var k=0;k<this.rightToLeftDoorArray.length; k++){
  //           if(this.randomGroundRoomTiles[i+1][0] === this.rightToLeftDoorArray[k][0]){
  //             this.rightToLeftDoorArray.push(this.randomGroundRoomTiles[i+1][0]);
  //           }
  //         }
  //       }
  //       else{
  //         console.log("not yay");
  //       }
  //     }
  //     console.log(this.rightToLeftDoorArray);
  //
  //   })
  //   this.gameService.getEventCardById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
  //     this.chosenEvent = dataLastEmittedFromObserver;
  //   })
  //   this.gameService.getOmenCardById(this.gameService.getRandomNumber(0,7)).subscribe(dataLastEmittedFromObserver => {
  //     this.chosenOmen = dataLastEmittedFromObserver;
  //   })
  //   this.gameService.getRoomTileById(this.gameService.getRandomNumber(0,24)).subscribe(dataLastEmittedFromObserver => {
  //     this.chosenRoom = dataLastEmittedFromObserver;
  //   })
  //
  }

}
