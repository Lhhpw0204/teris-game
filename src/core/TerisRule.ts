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

    private static getLineSquares(exists: Square[], y: number) {
        // 根据y坐标 得到同行的所有方块
        return exists.filter( sq => sq.point.y === y)
    }

    static deleteSquares(exists: Square[]): number {
        // 从已存在的方块中消除
        // 获取y坐标
        const ys = exists.map(sq => sq.point.y);
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        let num = 0;
        for(let i = minY;i <= maxY; i ++) {
            if(this.deleteLine(exists, i)) {
                num ++;
            };
        }
        return num;
    }

    private static deleteLine(exists: Square[], line:number): boolean {
        const squares = this.getLineSquares(exists, line);
        if(squares.length === GameConfig.panelSize.width) {
            // 从界面消除
            squares.forEach( sq => {
                if(sq.viewer) {
                    sq.viewer.remove();
                }
                // 从数组中消除
                const index = exists.indexOf(sq);
                exists.splice(index, 1);
            })
            // 剩下比y小的方块 y+1；
            exists.filter( sq => sq.point.y < line).forEach( sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
            return true;
        }
        return false;
    }
}