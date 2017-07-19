import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-room',
  templateUrl: './music-room.component.html',
  styleUrls: ['./music-room.component.scss']
})
export class MusicRoomComponent implements OnInit {

  doTheBack(){
    window.history.back();
  }

  constructor() { }

  ngOnInit() {
  }

}
