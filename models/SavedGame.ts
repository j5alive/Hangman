
export class SavedGame {
  
  correctWord: string | null;
  guessedLetters?: string[] | null

  constructor(correctWord: string | null = null, guessedLetters: string[] | null = null) {
    this.correctWord = correctWord;
    this.guessedLetters = guessedLetters;
  }

  serialize() : string {
    return JSON.stringify({ correctWord : this.correctWord, guessedLetters: this.guessedLetters });
  }
  
  deserialize(saveGameContent: string) : boolean {
    if (saveGameContent.length === 0) return false;
    
    const model = JSON.parse(saveGameContent)
    if (model.guessedLetters && model.correctWord) {
      this.guessedLetters = model.guessedLetters;
      this.correctWord = model.correctWord;
      return true;
    }
    
    return false;
  }

  isValid() : boolean {
    return this.correctWord !== null && this.guessedLetters !== null;
  }
  
  getCorrectWord() : string {
    return this.correctWord ?? "";
  }

  getGuessedLetters() {
    return this.guessedLetters ?? [];
  }
}