import { Square } from "./core/Square";
import { SquareGroup } from "./core/SquareGroup";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery"
import { LShape, createTeris } from "./core/Teris"


// const sq = new Square();
// sq.viewer = new SquarePageViewer(sq, $("#root"));
const group = createTeris({x: 3,y: 2})
group.suqares.forEach( sq => {
    console.log('sq', sq)
    sq.viewer = new SquarePageViewer(sq, $("#root"));
})