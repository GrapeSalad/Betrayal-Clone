import { Speed } from './speed.model';
import { Might } from './might.model';
import { Knowledge } from './knowledge.model';
import { Sanity } from './sanity.model';

export class Character {
  constructor(public name: string, public age: number, public height: string, public weight: string, public hobbies: string[]=null, public birthday: string, public bio: string, public bio2: string, public speed: Speed, public might: Might, public knowledge: Knowledge, public sanity: Sanity, public id: number) { }
}
