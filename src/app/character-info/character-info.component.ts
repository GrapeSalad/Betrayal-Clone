import { Component, OnInit } from '@angular/core';
// import {Router} from '@angular/router';
import {Character} from '../character.model';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.css']
})
export class CharacterInfoComponent implements OnInit {
  characters: Character[];
  constructor() { }

  ngOnInit() {
  }

  submitForm(name:string, description: string, id: number){
    const newCharacter: Character = new Character(name, description, id);
     console.log(newCharacter);
  }

  getAllCharacters(){
    console.log(this.characters);
  }


}
