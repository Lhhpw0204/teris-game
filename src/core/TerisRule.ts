import { Shape, Point, MoveDirection } from "./types"
import GameConfig from "./viewer/GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

function isPoint(obj: any): obj is Point {
    if(typeof obj.x === "undefined") {
        return false;
    }
    return true;
}

export class TerisRule{
    static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
        const targetSquarePoints: Point[] = shape.map( it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        });
        // 边界判断
        const res = targetSquarePoints.some(  p => {
            if(p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1) {
                return true
            }
            return false;
        })
        if(res) {
            return false;
        }
        // 判断是否与已保存的方块有重叠
        console.log(exists)
        let result = targetSquarePoints.some( sq => exists && exists.some(it => it.point.x === sq.x && it.point.y === sq.y));
        if(result) {
            return false;
        }
        return true;
    }

    // 函数重载
    static move(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;
    static move(teris: SquareGroup, targetPointOrDirection: Point | MoveDirection, exists: Square[]): boolean {
        if(isPoint(targetPointOrDirection)){
            if(this.canIMove(teris.shape, targetPointOrDirection, exists)) {
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
            return this.move(teris, targetPoint, exists);
        }
    }

    static moveDirectly(teris: SquareGroup, direction: MoveDirection, exists: Square[]) {
        while(this.move(teris, direction, exists)) {}
    }

    static rotate(teris: SquareGroup, exists: Square[]): boolean {
        const newShape = teris.afterRotateShape();
        if(this.canIMove(newShape, teris.centerPoint, exists)) {
            teris.rotate();
            return true;
        } else {
            return false;
        }
    }
}