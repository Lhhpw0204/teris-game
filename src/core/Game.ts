import { GameStatus, MoveDirection, GameViewer } from "./types"
import { SquareGroup } from "./SquareGroup"
import { TerisRule } from "./TerisRule"
import { createTeris } from "./Teris"
import GameConfig from "./viewer/GameConfig";

export class Game {
    // 游戏状态
    private _gamesStatus: GameStatus = GameStatus.init;
    // 当前操作的方块
    private _curTeris?: SquareGroup;
    // 下一个方块
    private _nextTeris: SquareGroup = createTeris({x: 0, y: 0});
    // 计时器
    private _timer?: number;
    // 间隔时间
    private _duration: number = 1000;
    constructor(private _viewer: GameViewer) {
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris)
    }

    start() {
        if(this._gamesStatus === GameStatus.playing) {
            return;
        }
        this._gamesStatus = GameStatus.playing;
        if(!this._curTeris) {
            this.switchTeris();
        }
        this.autoDrop();
    }
    private autoDrop() {
        if(this._timer || this._gamesStatus !== GameStatus.playing) {
            return ;
        }
        this._timer = setInterval(() => {
            if(this._curTeris) {
                TerisRule.move(this._curTeris, MoveDirection.down)
            }
        }, this._duration)
    }
    private switchTeris() {
        // 切换方块
        this._curTeris = this._nextTeris;
        this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);
        this._nextTeris = createTeris({x: 0, y: 0});
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.swtich(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    }

    private resetCenterPoint(width: number, teris: SquareGroup) {
        // 让方块出现在区域的中上方
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        teris.centerPoint = {
            x, y
        }
        while(teris.suqares.some(it => it.point.y < 0)) {
            teris.suqares.forEach( sq => sq.point = {
                x: sq.point.x,
                y: sq.point.y + 1
            })
        }
    }

    pause() {
        if(this._gamesStatus === GameStatus.playing) {
            this._gamesStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    control_left() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.left)
        }
    }
    control_right() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.right)
        }
    }
    control_down() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.down)
        }
    }
    control_rotate() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris)
        }
    }
}