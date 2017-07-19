import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.scss']
})
export class KitchenComponent implements OnInit {

  doTheBack(){
    window.history.back();
  }

  constructor() { }

  ngOnInit() {
  }

}
