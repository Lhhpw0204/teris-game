import { Point, IViewer } from "./types"

export class Square{
    // 属性： 显示 
    private _viewer?: IViewer

    public get viewer() {
        return this._viewer
    }
    public set viewer(v) {
        this._viewer = v;
        if(v) {
            v.show();
        }
    }

    public get point() {
        return this._point
    }
    public set point(val) {
        this._point = val;
        // 显示
        if(this._viewer) {
            this._viewer.show();
        }
    }
    public get color() {
        return this._color;
    }
    public set color(val) {
        this._color = val;
    }

    public constructor( 
        private _point: Point, 
        private _color: string
    ) { }
}