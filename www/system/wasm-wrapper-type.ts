export interface WasmWrapperType {
    new (...args: any): any;
    readonly prototype : object;
}