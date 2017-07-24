import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
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
  currentRoomTileArray: any[] = [];
  currentRoomTileId;
  visibleRoomTileArray: any[] = [];
  startScreen: boolean = true;
  groundShow: boolean = true;
  upstairsShow: boolean = false;
  basementShow: boolean = false;
  // selectedAnchorId: any[] = [];

constructor(private gameService: GameService) { }

// getIdOfElement(e){
//   document.getElementById('39').classList.remove('active');
//   if (this.selectedAnchorId.length === 0) {
//     this.selectedAnchorId.push(e.currentTarget);
//     this.selectedAnchorId[0].classList.add('active');
//   }
//   if (this.selectedAnchorId.length === 1) {
//     this.selectedAnchorId[0].classList.remove('active');
//     this.selectedAnchorId = [];
//     this.selectedAnchorId.push(e.currentTarget);
//     this.selectedAnchorId[0].classList.add('active');
//   }
// }

  // NOTE:active/selected: need to have two classes (or one class and one boolean)

  // @HostListener('document:keypress',['$event'])
  handleKeyboardEvent(event: KeyboardEvent){
    this.key = event.which || event.keyCode;

    //enter Key to start game
    // if(this.key === 13){
    //   document.getElementById('39').classList.add('active');
    // }

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
        this.currentRoomTileArray[0].classList.add('graveyard');
      }
      else if(this.currentRoomTileId === 22){
        this.currentRoomTileArray[0].classList.add('ballroom');
      }
      else if(this.currentRoomTileId === 46){
        this.currentRoomTileArray[0].classList.add('statuaryCorridor');
      }
      else if(this.currentRoomTileId === 87){
        this.currentRoomTileArray[0].classList.add('operatingLaboratory');
      }
      else if(this.currentRoomTileId === 97){
        this.currentRoomTileArray[0].classList.add('balcony');
      }
      else if(this.currentRoomTileId === 89){
        this.currentRoomTileArray[0].classList.add('creakyHallway');
      }
      else if(this.currentRoomTileId === 81){
        this.currentRoomTileArray[0].classList.add('attic');
      }
      else if(this.currentRoomTileId === 218){
        this.currentRoomTileArray[0].classList.add('catacombs');
      }
      else if(this.currentRoomTileId === 219){
        this.currentRoomTileArray[0].classList.add('wineCellar');
      }
      else if(this.currentRoomTileId === 210){
        this.currentRoomTileArray[0].classList.add('servantsQuarters');
      }
      else if(this.currentRoomTileId === 211){
        this.currentRoomTileArray[0].classList.add('furnaceRoom');
      }
      else if(this.currentRoomTileId === 202){
        this.currentRoomTileArray[0].classList.add('organRoom');
      }
      else if(this.currentRoomTileId === 203){
        this.currentRoomTileArray[0].classList.add('gymnasium');
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
        this.currentRoomTileArray[0].classList.add('conservatory');
      }
      else if(this.currentRoomTileId === 46){
        this.currentRoomTileArray[0].classList.add('statuaryCorridor');
      }
      else if(this.currentRoomTileId === 54){
        this.currentRoomTileArray[0].classList.add('gameRoom');
      }
      else if(this.currentRoomTileId === 62){
        this.currentRoomTileArray[0].classList.add('kitchen');
      }
      else if(this.currentRoomTileId === 47){
        this.currentRoomTileArray[0].classList.add('abandonedRoom');
      }
      else if(this.currentRoomTileId === 55){
        this.currentRoomTileArray[0].classList.add('coalChute');
      }
      else if(this.currentRoomTileId === 56){
        this.currentRoomTileArray[0].classList.add('gardens');
      }
      else if(this.currentRoomTileId === 97){
        this.currentRoomTileArray[0].classList.add('balcony');
      }
      else if(this.currentRoomTileId === 103){
        this.currentRoomTileArray[0].classList.add('charredRoom');
      }
      else if(this.currentRoomTileId === 111){
        this.currentRoomTileArray[0].classList.add('gallery');
      }
      else if(this.currentRoomTileId === 119){
        this.currentRoomTileArray[0].classList.add('storeroom');
      }
      else if(this.currentRoomTileId === 105){
        this.currentRoomTileArray[0].classList.add('collapsedRoom');
      }
      else if(this.currentRoomTileId === 113){
        this.currentRoomTileArray[0].classList.add('chapel');
      }
      else if(this.currentRoomTileId === 234){
        this.currentRoomTileArray[0].classList.add('larder');
      }
      else if(this.currentRoomTileId === 235){
        this.currentRoomTileArray[0].classList.add('crypt');
      }
      else if(this.currentRoomTileId === 242){
        this.currentRoomTileArray[0].classList.add('researchLaboratory');
      }
      else if(this.currentRoomTileId === 250){
        this.currentRoomTileArray[0].classList.add('vault');
      }
      else if(this.currentRoomTileId === 227){
        this.currentRoomTileArray[0].classList.add('dustyHallway');
      }
      else if(this.currentRoomTileId === 219){
        this.currentRoomTileArray[0].classList.add('wineCellar');
      }
      else if(this.currentRoomTileId === 218){
        this.currentRoomTileArray[0].classList.add('catacombs');
      }
    }

    //right
    if(this.key === 39){
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
        this.currentRoomTileArray[0].classList.add('library');
      }
      else if(this.currentRoomTileId === 48){
        this.currentRoomTileArray[0].classList.add('patio');
      }
      else if(this.currentRoomTileId === 88){
        this.currentRoomTileArray[0].classList.add('tower');
      }
      else if(this.currentRoomTileId === 89){
        this.currentRoomTileArray[0].classList.add('creakyHallway');
      }
      else if(this.currentRoomTileId === 104){
        this.currentRoomTileArray[0].classList.add('bedroom');
      }
      else if(this.currentRoomTileId === 105){
        this.currentRoomTileArray[0].classList.add('collapsedRoom');
      }
      else if(this.currentRoomTileId === 106){
        this.currentRoomTileArray[0].classList.add('masterBedroom');
      }
      //basement
      else if(this.currentRoomTileId === 227){
        this.currentRoomTileArray[0].classList.add('dustyHallway');
      }
      else if(this.currentRoomTileId === 228){
        this.currentRoomTileArray[0].classList.add('chasm');
      }
      else if(this.currentRoomTileId === 211){
        this.currentRoomTileArray[0].classList.add('furnaceRoom');
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
        this.currentRoomTileArray[0].classList.add('diningRoom');
      }
      else if(this.currentRoomTileId === 21){
        this.currentRoomTileArray[0].classList.add('junkroom');
      }
      else if(this.currentRoomTileId === 87){
        this.currentRoomTileArray[0].classList.add('operatingLaboratory');
      }
      else if(this.currentRoomTileId === 88){
        this.currentRoomTileArray[0].classList.add('tower');
      }
      else if(this.currentRoomTileId === 103){
        this.currentRoomTileArray[0].classList.add('charredRoom');
      }
      else if(this.currentRoomTileId === 104){
        this.currentRoomTileArray[0].classList.add('bedroom');
      }
      //basement
      else if(this.currentRoomTileId === 210){
        this.currentRoomTileArray[0].classList.add('servantsQuarters');
      }
      else if(this.currentRoomTileId === 209){
        this.currentRoomTileArray[0].classList.add('undergroundLake');
      }
      else if(this.currentRoomTileId === 225){
        this.currentRoomTileArray[0].classList.add('pentagramChamber');
      }
    }
  }


  // clicked(event){
  //   event.target.classList.add("active");
  // }

  ngOnInit() {
    this.currentRoomTileId = 39;

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
