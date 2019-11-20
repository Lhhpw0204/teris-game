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
    private _duration: number = GameConfig.level[0].duration;
    // 已落下的方块
    private _exists: Square[] = [];
    private _score: number = 0;

    public get score() {
        return this._score
    }
    public set score(val) {
        this._score = val;
        this._viewer.showScore(val);
        const level = GameConfig.level.filter(it => it.score < val).pop()!;
        console.log('level', level)
        if(this._duration === level.duration) {
            return;
        }
        this._duration = level.duration;
        if(this._timer) {
            this._timer = undefined;
            clearInterval(this._timer);
            this.autoDrop();
        }
    }

    public get GameStatus() {
        return this._gamesStatus;
    }

    constructor(private _viewer: GameViewer) {
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
        this._viewer.init(this);
        this._viewer.showScore(this.score);
    }
    private init() {
        this._exists.forEach( sq=> {
            if(sq.viewer) {
                sq.viewer.remove();
            }
        })
        this._exists = [];
        this._nextTeris = createTeris({x: 0, y: 0});
        this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
        this._curTeris = undefined;
        this._score = 0;
    }
    start() {
        if(this._gamesStatus === GameStatus.playing) {
            return;
        }
        // 结束 重新开始
        if(this._gamesStatus === GameStatus.over) {
            this.init();
        }
        this._gamesStatus = GameStatus.playing;
        if(!this._curTeris) {
            this.switchTeris();
        }
        this.autoDrop();
        this._viewer.onGameStart();
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
        //
        if(!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
            // over 
            this._gamesStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver();
            return;
        }
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
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        }
    }

    pause() {
        if(this._gamesStatus === GameStatus.playing) {
            this._gamesStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
        this._viewer.onGamePause();
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
        // 处理移除
        const num = TerisRule.deleteSquares(this._exists);
        // 增加积分
        this.addScore(num);
        // 切换
        this.switchTeris();
    }

    private addScore(lineNum: number) {
        if(lineNum === 0) {
            return;
        } else if(lineNum === 1) {
            this.score += 10;
        } else if(lineNum === 2) {
            this.score += 25;
        } else if(lineNum === 3) {
            this.score += 50;
        } else {
            this.score += 100;
        }
    }
}