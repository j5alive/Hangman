"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var Application = /** @class */ (function () {
    function Application(ui, game) {
        this.ui = ui;
        this.game = game;
    }
    Application.prototype.run = function () {
        this.ui.showWelcome();
        while (this.game.inPlay()) {
            this.playTurn();
        }
        this.ui.displayGameOutcome();
    };
    Application.prototype.playTurn = function () {
        var letter = this.ui.askForLetter();
        var accepted = this.game.submitLetter(letter);
        if (accepted) {
            this.ui.displayGuessOutcome();
        }
        else {
            this.ui.displayValidationError();
        }
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map