import { v4 as uuidv4 } from 'uuid';

export class Substitution {
  id: string;
  before: string;
  after: string;
  matchCase: boolean;

  constructor(before: string, after: string, matchCase: boolean) {
    this.id = uuidv4();
    this.before = before;
    this.after = after;
    this.matchCase = matchCase;
  }

}
