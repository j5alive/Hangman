"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Application_1 = require("./controllers/Application");
var UserInterface_1 = require("./views/UserInterface");
var Game_1 = require("./models/Game");
var game = new Game_1.Game();
var ui = new UserInterface_1.UserInterface(console, game);
var app = new Application_1.Application(ui, game);
app.run();
//# sourceMappingURL=index.js.map