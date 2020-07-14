import { WasmWrapperType } from './wasm-wrapper-type';

export function ptrToObj<T extends WasmWrapperType, V extends InstanceType<T>>(
    type: T,
    pointer: number
) : V
{
    const obj = Object.create(type.prototype);
    obj.ptr = pointer;
    return obj as V;
}