import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-room',
  templateUrl: './right-room.component.html',
  styleUrls: ['./right-room.component.css']
})
export class RightRoomComponent implements OnInit {

  doTheBack(){
    window.history.back();
  }

  constructor() { }

  ngOnInit() {
  }

}
