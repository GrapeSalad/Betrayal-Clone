import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { Speed } from './speed.model';
import { Might } from './might.model';
import { Knowledge } from './knowledge.model';
import { Sanity } from './sanity.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class CharacterService {
  characters: FirebaseListObservable<any[]>;
  selectedCharacters: FirebaseListObservable<any[]>;
  selectedCharacter: FirebaseListObservable<any[]>;
  selectedFriend:FirebaseListObservable<any[]>;
  charactersInDatabase: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.characters = database.list('characters');
    this.selectedCharacters = database.list('selectedCharacters');
    this.selectedCharacter = database.list('selectedCharacters');
    this.selectedFriend = database.list('selectedCharacters');
  }

  getCharacters(){
    return this.characters;
  }

  getSelectedCharacters(){
    return this.selectedCharacters;
  }

  getCharacterById(){
    return this.characters;
  }

  addSelectedCharacters(newCharacter1: Character, newCharacter2: Character) {
    this.selectedCharacter.push(newCharacter1);
    this.selectedFriend.push(newCharacter2);
  }

}
