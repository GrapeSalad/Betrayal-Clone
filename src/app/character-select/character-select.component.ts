import { Component, OnInit } from '@angular/core';
// import { FriendSelectComponent } from './friend-select/friend-select.component';
import { Character } from '../character.model';
import { Speed } from '../speed.model';
import { Might } from '../might.model';
import { Knowledge } from '../knowledge.model';
import { Sanity } from '../sanity.model';
import { CharacterService } from '../character.service';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.scss'],
  providers: [CharacterService]
})
export class CharacterSelectComponent implements OnInit {
  characters: Character[] = [];
  currentRoute: string = this.router.url;
  charSelect: boolean = true;
  friendSelect: boolean = false;
  selectedCharacter: string = null;
  selectedFriend: string = null;

  constructor(private router: Router, private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getCharacters().subscribe(dataLastEmittedFromObserver =>{
      for(var i=0; i<dataLastEmittedFromObserver.length; i++){
        this.characters.push(new Character(dataLastEmittedFromObserver[i].name,
          dataLastEmittedFromObserver[i].age,
          dataLastEmittedFromObserver[i].height,
          dataLastEmittedFromObserver[i].weight,
          dataLastEmittedFromObserver[i].hobbies,
          dataLastEmittedFromObserver[i].birthday,
          dataLastEmittedFromObserver[i].bio,
          dataLastEmittedFromObserver[i].bio2,
          new Speed(dataLastEmittedFromObserver[i].speed[0].initialIndex, dataLastEmittedFromObserver[i].speed[0].array),
          new Might(dataLastEmittedFromObserver[i].might[0].initialIndex, dataLastEmittedFromObserver[i].might[0].array),
          new Knowledge(dataLastEmittedFromObserver[i].knowledge[0].initialIndex, dataLastEmittedFromObserver[i].knowledge[0].array),
          new Sanity(dataLastEmittedFromObserver[i].sanity[0].initialIndex, dataLastEmittedFromObserver[i].sanity[0].array)));
      }
      console.log(dataLastEmittedFromObserver);
    });
  }

  goToFriendPage(clickedCharacter){
    this.router.navigate(['characters', clickedCharacter.$key]);
  }

  goToFriendSelect(playerCharacter){
    this.charSelect = false;
    this.friendSelect = true;
    this.selectedCharacter = playerCharacter.name;
    console.log(playerCharacter);
  }

}
