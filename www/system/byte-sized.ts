export interface ByteSized {
    new (...args: any): any;
    size_in_bytes() : number;
    readonly prototype : object;
}