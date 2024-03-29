import {FilePersistence} from "../services/FilePersistence";

const randomWords = require('random-words');

export class Game {
  static MaximumTurns : number = 7;

  private readonly filePersistence: FilePersistence;
  correctWord: string;
  guessedLetters: string[]

  constructor() {
    this.filePersistence = new FilePersistence("savegame.dat")
    this.correctWord = randomWords();
    this.guessedLetters = [];
  }

  redactedWord(joiner: string): string {
    return this.correctWord
      .split("")
      .map((letter) => this.guessedLetters.indexOf(letter) > -1 ? letter : "_")
      .join(joiner);
  }
  
  incorrectGuessCount() {
    return this.guessedLetters.filter((letter) => this.correctWord.indexOf(letter) === -1).length;
  }

  turnsRemaining(): number {
    return(Game.MaximumTurns - this.incorrectGuessCount());
  }

  isWon() {
    return this.redactedWord("") === this.correctWord;
  }

  isLost() {
    // number of incorrect guesses = number of lives
    return this.incorrectGuessCount() === Game.MaximumTurns;
  }

  inPlay(): boolean {
    return !this.isWon() && !this.isLost();
  }

  submitLetter(input: string): boolean {
    // A letter should only be 1 character
    if (input.length !== 1) return false;
    
    const lowerLetter = input.toLowerCase();
    // It must be a letter
    if (!lowerLetter.match(/[a-z]/i)) return false;
    // A letter cannot be guessed more than once
    if (this.guessedLetters.indexOf(lowerLetter) !== -1) return false;
    
    this.guessedLetters.push(lowerLetter);
    return true;
  }
  
  lastLetterCorrect(): boolean {
    if (this.guessedLetters.length === 0) return false;
    
    const lastGuessedLetter = this.guessedLetters[this.guessedLetters.length-1];
    return this.correctWord.indexOf(lastGuessedLetter) > -1;
  }
  
  save() {
    this.filePersistence.save(this);
  }
  
  load() {
    const savedGame = this.filePersistence.load();
    if (savedGame != null && savedGame.isValid()){
      this.correctWord = savedGame.getCorrectWord();
      this.guessedLetters = savedGame.getGuessedLetters();
    }
  }

  reset() {
    this.filePersistence.reset();
  }
}
