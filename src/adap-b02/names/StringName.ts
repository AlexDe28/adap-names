import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if(delimiter) this.delimiter = delimiter;

        this.name = source;
        this.noComponents = this.countNoComponents();
    }

    public asString(delimiter: string = this.delimiter): string {
        let outputName: string = "";
            for(let idx_letter = 0; idx_letter < this.name.length; idx_letter++){
                    if(this.name[idx_letter]===ESCAPE_CHARACTER){
                    //Skip first appearance of escape character
                    idx_letter += 1;
                    if(idx_letter < this.name.length)outputName += this.name[idx_letter]
                    }
                    else outputName += this.name[idx_letter]
            }
            return outputName;
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    public getNoComponents(): number {
        throw new Error("needs implementation or deletion");
    }

    public getComponent(x: number): string {
        throw new Error("needs implementation or deletion");
    }

    public setComponent(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public insert(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(n: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }

    private countNoComponents(): number {
        throw new Error("needs implementation or deletion");
    }

}