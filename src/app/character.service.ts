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

  // getCharacterById(charId: number){
  //   return this.database.object('characters/' + charId);
  // }

  getCharacterById(){
    return this.characters;
  }


  // getSelectedCharacter(character: Character){
  //   this.selectedCharacter = character;
  //   // console.log(this.selectedCharacter);
  // }

  // addSelectedCharacters(localSelectedCharacter, localSelectedFriend) {
  //   console.log("HI");
  //   this.selectedCharacter = this.database.object('/selectedCharacters/0');
  //   this.selectedFriend = this.database.object('/selectedCharacters/1');
  //   this.database.object('/selectedCharacters/0').update({name: localSelectedCharacter.name,
  //     age: localSelectedCharacter.age,
  //     height: localSelectedCharacter.height,
  //     weight: localSelectedCharacter.weight,
  //     hobbies: localSelectedCharacter.hobbies,
  //     birthday: localSelectedCharacter.birthday,
  //     bio: localSelectedCharacter.bio,
  //     bio2: localSelectedCharacter.bio2,
  //     speed: new Speed(localSelectedCharacter.speed[0].initialIndex, localSelectedCharacter.speed[0].array),
  //     might: new Might(localSelectedCharacter.might[0].initialIndex, localSelectedCharacter.might[0].array),
  //     knowledge: new Knowledge(localSelectedCharacter.knowledge[0].initialIndex, localSelectedCharacter.knowledge[0].array),
  //     sanity: new Sanity(localSelectedCharacter.sanity[0].initialIndex, localSelectedCharacter.sanity[0].array)});
  //   this.database.object('/selectedCharacters/1').update({name: localSelectedFriend.name,
  //     age: localSelectedFriend.age,
  //     height: localSelectedFriend.height,
  //     weight: localSelectedFriend.weight,
  //     hobbies: localSelectedFriend.hobbies,
  //     birthday: localSelectedFriend.birthday,
  //     bio: localSelectedFriend.bio,
  //     bio2: localSelectedFriend.bio2,
  //     speed: new Speed(localSelectedFriend.speed[0].initialIndex, localSelectedFriend.speed[0].array),
  //     might: new Might(localSelectedFriend.might[0].initialIndex, localSelectedFriend.might[0].array),
  //     knowledge: new Knowledge(localSelectedFriend.knowledge[0].initialIndex, localSelectedFriend.knowledge[0].array),
  //     sanity: new Sanity(localSelectedFriend.sanity[0].initialIndex, localSelectedFriend.sanity[0].array)});
  // }

  addSelectedCharacters(newCharacter1: Character, newCharacter2: Character) {
    this.selectedCharacter.push(newCharacter1);
    this.selectedFriend.push(newCharacter2);
  }

}
