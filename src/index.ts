import { Square } from "./core/Square";
import { SquareGroup } from "./core/SquareGroup";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
// import $ from "jquery";
import { createTeris } from "./core/Teris"
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./core/types";
import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";

new Game(new GamePageViewer());