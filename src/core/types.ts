import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

export interface Point{
    readonly x: number,
    readonly y: number
}

export interface IViewer{
    show(): void;  //显示
    remove(): void; //不显示
}

export type Shape = Point[]

export enum MoveDirection {
    left,
    right,
    down
}

export enum GameStatus{
    init,
    playing,
    pause,
    over
}

export interface GameViewer{
    showNext(teris: SquareGroup): void;
    swtich (teris: SquareGroup): void;
    init(game: Game): void; // 界面初始化
    showScore(score: number): void;
    onGamePause(): void;
    onGameStart(): void;
    onGameOver(): void;
}