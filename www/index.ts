import * as wasm from "ant-sim-wasm";

wasm.init();

const width = 40;
const height = 40;
const field = wasm.Field.new(width, height);

const cellSizeInBytes = wasm.Cell.size_in_bytes();
const cellsPtr = field.cells();

let str = '';
let curPtr = cellsPtr - 4; // why -4? i don't know
for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        const obj = Object.create(wasm.Cell.prototype);
        obj.ptr = curPtr;
        const cell = obj as wasm.Cell;
        const is_obstacle = cell.is_obstacle;
        str += is_obstacle ? '◼' : '◻';
        curPtr += cellSizeInBytes;
    }
    str += '\n';
}

const pre = document.getElementById("ant-sim-canvas");
pre.textContent = str;
