"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var randomWords = require('random-words');
var Game = /** @class */ (function () {
    function Game() {
        this.correctWord = randomWords();
        this.guessedLetters = [];
    }
    Game.prototype.redactedWord = function (joiner) {
        var _this = this;
        return this.correctWord
            .split("")
            .map(function (letter) { return _this.guessedLetters.indexOf(letter) > -1 ? letter : "_"; })
            .join(joiner);
    };
    Game.prototype.incorrectGuessCount = function () {
        var _this = this;
        return this.guessedLetters.filter(function (letter) { return _this.correctWord.indexOf(letter) === -1; }).length;
    };
    Game.prototype.turnsRemaining = function () {
        return (Game.MaximumTurns - this.incorrectGuessCount());
    };
    Game.prototype.isWon = function () {
        return this.redactedWord("") === this.correctWord;
    };
    ;
    Game.prototype.isLost = function () {
        // number of incorrect guesses = number of lives
        return this.incorrectGuessCount() === Game.MaximumTurns;
    };
    ;
    Game.prototype.inPlay = function () {
        return !this.isWon() && !this.isLost();
    };
    Game.prototype.submitLetter = function (input) {
        // A letter should only be 1 character
        if (input.length !== 1)
            return false;
        var lowerLetter = input.toLowerCase();
        // It must be a letter
        if (!lowerLetter.match(/[a-z]/i))
            return false;
        // A letter cannot be guessed more than once
        if (this.guessedLetters.indexOf(lowerLetter) !== -1)
            return false;
        this.guessedLetters.push(lowerLetter);
        return true;
    };
    Game.MaximumTurns = 7;
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=Game.js.map