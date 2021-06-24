
export class SavedGame {
  
  correctWord: string;
  guessedLetters: string[]

  constructor(correctWord: string = null, guessedLetters: string[] = null) {
    this.correctWord = correctWord;
    this.guessedLetters = guessedLetters;
  }

  serialize() : string {
    return JSON.stringify({ correctWord : this.correctWord, guessedLetters: this.guessedLetters });
  }
  
  deserialize(saveGameContent: string) : boolean {
    if (saveGameContent.length === 0) return false;
    
    const model = JSON.parse(saveGameContent)
    this.guessedLetters = model.guessedLetters;
    this.correctWord = model.correctWord;
    return true;
  }
}