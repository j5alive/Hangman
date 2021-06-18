import {UserInterface} from "../views/UserInterface";
import {Game} from "../models/Game";

export class Application {
  private ui: UserInterface
  private game: Game;
  
  constructor(ui: UserInterface, game: Game) {
    this.ui = ui;
    this.game = game;
  }
  
  run() {
    this.ui.showWelcome();

    while (this.game.inPlay()) {
      this.playTurn();
    }
    
    this.ui.displayGameOutcome();
  }
  
  playTurn() {
    const letter = this.ui.askForLetter();
    const accepted = this.game.submitLetter(letter);

    if (accepted) {
      this.ui.displayGuessOutcome();
    } else {
      this.ui.displayValidationError();
    }
  }
}
