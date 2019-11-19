import { Square } from "./Square"
import { Shape, Point } from "./types"

export class SquareGroup{
    private _suqares: readonly Square[]

    public get suqares() {
        return this._suqares;
    }

    public get centerPoint(): Point {
        return this._centerPoint;
    }
    public set centerPoint(val : Point) {
        this._centerPoint = val;
        // 同时设置其他小方块坐标
        this._shape.forEach( (item, index) => {
            this._suqares[index].point = {
                x: this._centerPoint.x + item.x,
                y: this._centerPoint.y + item.y
            }
        })
    }

    constructor(
        private _shape: Shape, 
        private _centerPoint: Point, 
        private _color: string
    ){
            // 设置小方块数组
        const arr: Square[] = [];
        this._shape.forEach( (item) => {
            const sq = new Square();
            sq.color = this._color;
            sq.point = {
                x: this._centerPoint.x + item.x,
                y: this._centerPoint.y + item.y
            }
            arr.push(sq);
        })
        this._suqares = arr;
    }
}