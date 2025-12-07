import { File } from "./File";
import { Directory } from "./Directory";

import { InvalidStateException } from "../common/InvalidStateException";


export class BuggyFile extends File {

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    /**
     * Fault injection for homework
     * @returns base name, here always ""
     */
    protected doGetBaseName(): string {
        const baseName: string = super.doGetBaseName();

        this.baseName = "";

        const newBaseName: string = super.doGetBaseName();
        InvalidStateException.assert(baseName == newBaseName);
        
        return newBaseName;
    }

}
