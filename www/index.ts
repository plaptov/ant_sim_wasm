import * as wasm from "ant-sim-wasm";
import { FIELD_WIDTH, FIELD_HEIGHT, CELL_SIZE } from "./consts";
import { render } from './rendering/renderer';
import { ptrToObj } from './system/ptr-to-obj';

wasm.init();

const universe = wasm.Universe.generate(FIELD_WIDTH, FIELD_HEIGHT, 1, 50);
const field = ptrToObj(wasm.Field, universe.get_field() - 4);

const canvas = document.getElementById("ant-sim-canvas") as HTMLCanvasElement;
canvas.height = (CELL_SIZE + 1) * FIELD_HEIGHT + 1;
canvas.width = (CELL_SIZE + 1) * FIELD_WIDTH + 1;
const ctx = canvas.getContext('2d');

const renderLoop = () => {
    universe.tick();
    render(ctx, field);
    requestAnimationFrame(renderLoop);
};
render(ctx, field);
requestAnimationFrame(renderLoop);