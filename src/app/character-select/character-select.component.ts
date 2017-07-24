import { Component, OnInit } from '@angular/core';
// import { FriendSelectComponent } from './friend-select/friend-select.component';
import { Character } from '../character.model';
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
  characters: FirebaseListObservable<any[]>;
  currentRoute: string = this.router.url;

  constructor(private router: Router, private characterService: CharacterService) { }

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
    console.log(this.characters);
  }

  goToFriendPage(clickedCharacter){
    this.router.navigate(['characters', clickedCharacter.$key]);
  };

}
