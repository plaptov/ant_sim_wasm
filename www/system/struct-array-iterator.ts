import { ByteSized } from "./byte-sized";

export function iter<T extends ByteSized, V extends InstanceType<T>>(
    type: T,
    pointer: number,
    elementsCount: number
) : StructArrayIterator<V> {
    return new StructArrayIterator<V>(
        pointer - 4,
        type.prototype,
        type.size_in_bytes(),
        elementsCount
    );
}

export class StructArrayIterator<T> implements IterableIterator<T>
{
    constructor(
        private pointer: number,
        private readonly prototype: object,
        private readonly sizeInBytes: number,
        elementsCount: number)
    {
        this.endAddress = pointer + elementsCount * sizeInBytes;
    }

    private readonly endAddress: number;

    [Symbol.iterator](): IterableIterator<T> {
        return this;
    }

    public next() : IteratorResult<T> {
        if (this.pointer < this.endAddress) {
            const obj = Object.create(this.prototype);
            obj.ptr = this.pointer;
            this.pointer += this.sizeInBytes;
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