import { GameStatus, MoveDirection, GameViewer } from "./types"
import { SquareGroup } from "./SquareGroup"
import { TerisRule } from "./TerisRule"
import { createTeris } from "./Teris"
import GameConfig from "./viewer/GameConfig";
import { Square } from "./Square";

export class Game {
    // 游戏状态
    private _gamesStatus: GameStatus = GameStatus.init;
    // 当前操作的方块
    private _curTeris?: SquareGroup;
    // 下一个方块
    private _nextTeris: SquareGroup = createTeris({x: 0, y: 0});
    // 计时器
    private _timer?: any;
    // 间隔时间
    private _duration: number = 1000;
    // 已落下的方块
    private _exists: Square[] = [];
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
                if(!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
                    this.hitBottom();
                }
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
            TerisRule.move(this._curTeris, MoveDirection.left, this._exists)
        }
    }
    control_right() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, MoveDirection.right, this._exists)
        }
    }
    control_down() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.moveDirectly(this._curTeris, MoveDirection.down, this._exists);
            this.hitBottom();
        }
    }
    control_rotate() {
        if(this._curTeris && this._gamesStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris, this._exists)
        }
    }

    private hitBottom(){
        //  触底操作
        // 将当前的俄罗斯方块 加入到已保存的方块数组中
        this._exists.push(...this._curTeris!.suqares);
        this.switchTeris();
    }
}