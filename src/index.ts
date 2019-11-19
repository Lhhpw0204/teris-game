import { Square } from "./core/Square";
import { SquareGroup } from "./core/SquareGroup";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
// import $ from "jquery";
import { createTeris } from "./core/Teris"
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./core/types";

const teris = createTeris({x: 3,y: 2})
teris.suqares.forEach( sq => {
    sq.viewer = new SquarePageViewer(sq, $("#panel"));
})

$("#left").click(function () {
    TerisRule.move(teris, MoveDirection.left)
});
$("#down").click(function () {
    TerisRule.move(teris, MoveDirection.down)
});
$("#right").click(function () {
    TerisRule.move(teris, MoveDirection.right)
});