import { ByteSized } from "./byte-sized";
import { ptrToObj } from './ptr-to-obj';

export function iter<T extends ByteSized, V extends InstanceType<T>>(
    type: T,
    pointer: number,
    elementsCount: number
) : StructArrayIterator<V> {
    return new StructArrayIterator<V>(
        pointer - 4,
        type,
        elementsCount
    );
}

export class StructArrayIterator<T> implements IterableIterator<T>
{
    constructor(
        private pointer: number,
        private readonly type: ByteSized,
        elementsCount: number)
    {
        this.endAddress = pointer + elementsCount * type.size_in_bytes();
    }

    private readonly endAddress: number;

    [Symbol.iterator](): IterableIterator<T> {
        return this;
    }

    public next() : IteratorResult<T> {
        if (this.pointer < this.endAddress) {
            const obj = ptrToObj(this.type, this.pointer);
            this.pointer += this.type.size_in_bytes();
            return {
                value: obj as T,
                done: false,
            };
        } else {
            return {
                value: null,
                done: true,
            };
        }
    }

}