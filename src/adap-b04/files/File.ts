import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        IllegalArgumentException.assert(this.doGetFileState() == FileState.CLOSED, "File not closed");
        // do something
    }

    public read(noBytes: number): Int8Array {
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, "File not opened");
        // read something
        return new Int8Array();
    }

    public close(): void {
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, "File not opened");
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}