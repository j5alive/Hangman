import {Game} from "../models/Game";
import * as fs from 'fs';
import {SavedGame} from "../models/SavedGame";

export class FilePersistence {

  private readonly fileName : string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  save(game : Game) : boolean {
    const savedGame = new SavedGame(game.correctWord, game.guessedLetters);
    fs.writeFileSync(this.fileName, savedGame.serialize(), 'utf-8');
    return true;
  }
  
  load() : SavedGame | null {
    if (!fs.existsSync(this.fileName)) return null;
    
    const fileContents = fs.readFileSync(this.fileName, 'utf-8')
    const savedGame = new SavedGame();
    if (savedGame.deserialize(fileContents)) {
      return savedGame;
    }
    return null;
  }
  
  reset() {
    fs.rmSync(this.fileName);
  }
}