import { Field } from 'ant-sim-wasm';
import { renderField } from './field-renderer';
import { renderCells } from './cells-renderer';

export function render(ctx: CanvasRenderingContext2D, field: Field) {
    renderField(ctx, field);
    renderCells(ctx, field);
}