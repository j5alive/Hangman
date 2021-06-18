import {Game} from "../models/Game";

export class HangmanGenerator {
  
  private readonly game : Game;

  // "-----\n"
  // "|   |\n"
  // "|   O\n"
  // "|   |\n"
  // "|   /\\\n"
  // "|     \n"
  // "------"
  
  firstGuessParts : any[] = [
    [6,0,"-"], [6,1,"-"], [6,2,"-"], [6,3,"-"], [6,4,"-"], [6,5,"-"]
  ]
  secondGuessParts : any[] = [
    [1,0,"|"], [2,0,"|"], [3,0,"|"], [4,0,"|"], [5,0,"|"]
  ]
  thirdGuessParts : any[] = [
    [0,0,"-"], [0,1,"-"], [0,2,"-"], [0,3,"-"], [0,4,"-"]
  ]
  fourthGuessParts : any[] = [
    [1,4,"|"]
  ]
  fifthGuessParts : any[] = [
    [2,4,"O"]
  ]
  sixthGuessParts : any[] = [
    [3,4,"|"]
  ]
  seventhGuessParts : any[] = [
    [4,4,"/\\"]
  ]
  

  constructor(game: Game) {
    this.game = game;
  }

  run(): string {
    
    const incorrectGuessCount = this.game.incorrectGuessCount()
    
    const matrix = this.generateInitialMatrix();
    
    if (incorrectGuessCount > 0){
      this.addGuessPartsToMatrix(matrix, this.firstGuessParts);
    }
    if (incorrectGuessCount > 1){
      this.addGuessPartsToMatrix(matrix, this.secondGuessParts);
    }
    if (incorrectGuessCount > 2){
      this.addGuessPartsToMatrix(matrix, this.thirdGuessParts);
    }
    if (incorrectGuessCount > 3){
      this.addGuessPartsToMatrix(matrix, this.fourthGuessParts);
    }
    if (incorrectGuessCount > 4){
      this.addGuessPartsToMatrix(matrix, this.fifthGuessParts);
    }
    if (incorrectGuessCount > 5){
      this.addGuessPartsToMatrix(matrix, this.sixthGuessParts);
    }
    if (incorrectGuessCount > 6){
      this.addGuessPartsToMatrix(matrix, this.seventhGuessParts);
    }

    let hangman : string = "";
    for (let i = 0; i < matrix.length; i++) {
      const inner = matrix[i];
      for (let j = 0; j < inner.length; j++) {
        hangman += inner[j];
      }
    }
    
    return hangman;
  }
  
  addGuessPartsToMatrix(matrix, parts) {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      matrix[part[0]][part[1]] = part[2];
    }
  }
  
  generateInitialMatrix() {
    const matrix = [];
    for (let i = 0; i < 7; i++) {
      matrix[i] = [" ", " ", " ", " ", " ", "\n"]
    }
    return matrix;
  }
}