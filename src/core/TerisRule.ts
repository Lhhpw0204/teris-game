import { Shape, Point, MoveDirection } from "./types"
import GameConfig from "./viewer/GameConfig";
import { SquareGroup } from "./SquareGroup";

function isPoint(obj: any): obj is Point {
    if(typeof obj.x === "undefined") {
        return false;
    }
    return true;
}

export class TerisRule{
    static canIMove(shape: Shape, targetPoint: Point): boolean {
        const targetSquarePoints: Point[] = shape.map( it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        });
        const res = targetSquarePoints.some(  p => {
            if(p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1) {
                return true
            }
            return false;
        })
        if(res) {
            return false;
        }
        return true;
    }

    // 函数重载
    static move(teris: SquareGroup, targetPoint: Point): boolean;
    static move(teris: SquareGroup, direction: MoveDirection ): boolean;
    static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection ): boolean {
        if(isPoint(targetPointOrDirection)){
            if(this.canIMove(teris.shape, targetPointOrDirection)) {
                teris.centerPoint = targetPointOrDirection;
                return true;
            }
            return false;
        } else {
            const direction = targetPointOrDirection;
            let targetPoint : Point;
            if(direction === MoveDirection.down) {
                targetPoint = {
                    x: teris.centerPoint.x,
                    y: teris.centerPoint.y + 1
                }
            } else if (direction === MoveDirection.left) {
                targetPoint = {
                    x: teris.centerPoint.x - 1,
                    y: teris.centerPoint.y
                }
            } else {
                targetPoint = {
                    x: teris.centerPoint.x + 1,
                    y: teris.centerPoint.y
                }
            }
            return this.move(teris, targetPoint);
        }
    }

    static moveDirectly(teris: SquareGroup, direction: MoveDirection) {
        while(this.move(teris, direction)) {}
    }

    static rotate(teris: SquareGroup): boolean {
        const newShape = teris.afterRotateShape();
        if(this.canIMove(newShape, teris.centerPoint)) {
            teris.rotate();
            return true;
        } else {
            return false;
        }
    }
}