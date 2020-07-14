import { Cell, Field } from "ant-sim-wasm";
import { CELL_SIZE, OBSTACLE_COLOR, EMPTY_CELL_COLOR, ANTS_COLOR, FOOD_COLOR } from "../consts";
import { iter } from '../system/struct-array-iterator';

export function renderCells(ctx: CanvasRenderingContext2D, field: Field) {
    const cells = iter(Cell, field.cells(), field.width() * field.height());
    
    ctx.beginPath();

    for (let cell of cells) {
        let color;
        if (cell.ants_count > 0) {
            color = ANTS_COLOR;
        }
        else if (cell.food_count > 0) {
            color = FOOD_COLOR;
        }
        else
            color = cell.is_obstacle
                ? OBSTACLE_COLOR
                : EMPTY_CELL_COLOR;

        ctx.fillStyle = color;
        const pos = cell.position;
        ctx.fillRect(
            pos.x * (CELL_SIZE + 1) + 1,
            pos.y * (CELL_SIZE + 1) + 1,
            CELL_SIZE,
            CELL_SIZE
        );
    }

    ctx.stroke();
}