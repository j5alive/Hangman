import {OutputWriter} from "../types/OutputWriter";
import {Game} from "../models/Game";
const prompt = require('prompt-sync')({sigint: true});

export class UserInterface {
  private output: OutputWriter
  private game: Game;

  constructor(output: OutputWriter, game: Game) {
    this.output = output;
    this.game = game;
  }

  showWelcome(){
    this.output.log("Welcome to Hangman!");
    this.output.log(`You have ${Game.MaximumTurns} turns to guess the correct word`);
    this.output.log(`The word you need to guess is ${this.game.redactedWord(" ")}`);
  }
  
  askForLetter() : string {
    return prompt("Enter your next letter: ");
  }

  displayGuessOutcome(hangman: string) {
    this.output.log(`Current guess: ${this.game.redactedWord(" ")}`);
    this.output.log(hangman);
    this.output.log(`You have ${this.game.turnsRemaining()} turns left`);
  }

  displayGameOutcome() {
    if (this.game.isWon()) {
      this.output.log("Well done, you saved the man!");
    } else {
      this.output.log(`You've run out of turns, the correct word was ${this.game.correctWord}`);
    }
  }

  displayValidationError() {
    this.output.log("Please enter a single letter (a-z) that has not already been guessed");
  }
}
