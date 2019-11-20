import { GameViewer, GameStatus } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import { Game } from "../Game";
import GameConfig from "./GameConfig";
import PageConfig from "./PageConfig";

export class GamePageViewer implements GameViewer{
    private nextDom = $("#next");
    private panelDom = $("#panel");
    private scoreDom = $("#score");
    private msgDom = $("#msg");

    showNext(teris: SquareGroup): void {
        teris.suqares.forEach( sq => {
            sq.viewer = new SquarePageViewer(sq, this.nextDom)
        })
    }

    swtich(teris: SquareGroup) : void {
        teris.suqares.forEach( sq => {
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq, this.panelDom)
        })
    }
    init(game: Game): void {
        // 设置宽高
        this.panelDom.css({
            width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height: GameConfig.panelSize.height * PageConfig.SquareSize.height
        })
        this.nextDom.css({
            width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
            height: GameConfig.nextSize.height * PageConfig.SquareSize.height
        })

        // 键盘事件
        $(document).keydown( (e) => {
            let eCode = e.keyCode;
            if(eCode === 37) {
                game.control_left();
            } else if(eCode === 38) {
                game.control_rotate();
            } else if(eCode === 39) {
                game.control_right();
            } else if(eCode === 40) {
                game.control_down();
            } else if(eCode === 32) {
                if(game.GameStatus === GameStatus.playing) {
                    game.pause();
                } else {
                    game.start();
                }
            }
        })
    }

    showScore(score: number) : void {
        this.scoreDom.html(score.toString());
    }

    onGamePause() {
        this.msgDom.css({
            display: 'block'
        }).html("Pause")
    }

    onGameStart() {
        this.msgDom.css({
            display: 'none'
        });
    }

    onGameOver() {
        this.msgDom.css({
            display: 'block'
        }).html("Over")
    }
}