import { WasmWrapperType } from './wasm-wrapper-type';

export interface ByteSized extends WasmWrapperType {
    new (...args: any): any;
    size_in_bytes() : number;
    readonly prototype : object;
}