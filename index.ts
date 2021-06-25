import {Application} from "./controllers/Application";
import {UserInterface} from "./views/UserInterface";
import {Game} from "./models/Game";

const game = new Game();
game.load();

const ui = new UserInterface(console, game);
const app = new Application(ui, game);
app.run();