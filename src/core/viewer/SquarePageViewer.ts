import { Square } from "../Square"
// import $ from "jquery"
import { IViewer } from "../types"
import PageConfig from "./PageConfig"

export class SquarePageViewer implements IViewer {
    private dom ? : JQuery<HTMLElement>
    private isRemove: boolean = false
    show(): void {
        if(this.isRemove) {
            return;
        }
        if(!this.dom) {
            this.dom = $("<div>").css({
                position: "absolute",
                width: PageConfig.SquareSize.width,
                height: PageConfig.SquareSize.height,
                border: "solid 1px #ccc",
                boxSizing: "border-box"
            }).appendTo(this.container);
        }
        this.dom.css({
            left: this.square.point.x * PageConfig.SquareSize.width,
            top: this.square.point.y * PageConfig.SquareSize.height,
            background: this.square.color
        })
    }

    remove(): void {
        if(this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
    constructor(
        private square: Square, 
        private container: JQuery<HTMLElement>
    ) {

    }
}