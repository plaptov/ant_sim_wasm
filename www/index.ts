import * as wasm from "ant-sim-wasm";
import { FIELD_WIDTH, FIELD_HEIGHT } from "./consts";
import { iter } from "./system/struct-array-iterator";

wasm.init();

const field = wasm.Field.new(FIELD_WIDTH, FIELD_HEIGHT);

/*
const canvas = document.getElementById("ant-sim-canvas") as HTMLCanvasElement;
canvas.height = (CELL_SIZE + 1) * FIELD_HEIGHT + 1;
canvas.width = (CELL_SIZE + 1) * FIELD_WIDTH + 1;
const ctx = canvas.getContext('2d');
*/
const cells = iter(wasm.Cell, field.cells(), field.width() * field.height());

let str = '';
let x = 0;
for (let cell of cells) {
    const is_obstacle = cell.is_obstacle;
    str += is_obstacle ? '◼' : '◻';
    x++;
    if (x === field.width()) {
        str += '\n';
        x = 0;
    }
}

const pre = document.getElementById("ant-sim-canvas");
pre.textContent = str;
