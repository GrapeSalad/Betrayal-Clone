import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-garden',
  templateUrl: './garden.component.html',
  styleUrls: ['./garden.component.scss']
})
export class GardenComponent implements OnInit {

  doTheBack(){
    window.history.back();
  }

  constructor() { }

  ngOnInit() {
  }

}
