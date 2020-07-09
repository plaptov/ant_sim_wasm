import { ByteSized } from "./byte-sized";

export function iter<T extends ByteSized, V extends InstanceType<T>>(
    type: T,
    pointer: number,
    elementsCount: number
) : V[] {
    let result: V[] = [];
    const cellSizeInBytes = type.size_in_bytes();
    let curPtr = pointer - 4; // why -4? i don't know
    for (let x = 0; x < elementsCount; x++) {
        const obj = Object.create(type.prototype);
        obj.ptr = curPtr;
        const cell = obj as V;
        result.push(cell);
        curPtr += cellSizeInBytes;
    }
    return result;
}