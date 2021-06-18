"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterface = void 0;
var Game_1 = require("../models/Game");
var prompt = require('prompt-sync')({ sigint: true });
var UserInterface = /** @class */ (function () {
    function UserInterface(output, game) {
        this.output = output;
        this.game = game;
    }
    UserInterface.prototype.showWelcome = function () {
        this.output.log("Welcome to Hangman!");
        this.output.log("You have " + Game_1.Game.MaximumTurns + " turns to guess the correct word.");
        this.output.log("The word you need to guess is " + this.game.redactedWord(" ") + ".");
    };
    UserInterface.prototype.askForLetter = function () {
        return prompt("Enter your next letter: ");
    };
    UserInterface.prototype.displayGuessOutcome = function () {
        this.output.log("You have " + this.game.turnsRemaining() + " turns left.");
        this.output.log(this.game.redactedWord(" "));
    };
    UserInterface.prototype.displayGameOutcome = function () {
        if (this.game.isWon()) {
            this.output.log("Well done, you saved the man!");
        }
        else {
            this.output.log("You've run out of turns, the correct word was " + this.game.correctWord + ".");
        }
    };
    UserInterface.prototype.displayValidationError = function () {
        this.output.log("Please enter a single letter (a-z)");
    };
    return UserInterface;
}());
exports.UserInterface = UserInterface;
//# sourceMappingURL=UserInterface.js.map