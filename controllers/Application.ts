import {UserInterface} from "../views/UserInterface";
import {Game} from "../models/Game";
import {HangmanGenerator} from "../services/HangmanGenerator";

export class Application {
  private readonly ui: UserInterface
  private readonly game: Game;
  
  constructor(ui: UserInterface, game: Game) {
    this.ui = ui;
    this.game = game;
  }
  
  run() {
    this.ui.showWelcome();

    while (this.game.inPlay()) {
      this.playTurn();
      //process.exit();
    }
    
    this.ui.displayGameOutcome();
    this.game.reset();
    
  }
  
  playTurn() {
    const letter = this.ui.askForLetter();
    const accepted = this.game.submitLetter(letter);

    if (accepted) {
      this.game.save();
      
      let hangman = "";
      if (!this.game.lastLetterCorrect()) {
        const generatorService = new HangmanGenerator(this.game);
        hangman = generatorService.run();
      }
      
      this.ui.displayGuessOutcome(hangman);
    } else {
      this.ui.displayValidationError();
    }
  }
}
