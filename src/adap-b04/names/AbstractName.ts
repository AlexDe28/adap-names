import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(this.isValidDelimiterLength(delimiter), "invalid delimiter length");
        IllegalArgumentException.assert(this.isValidDelimiter(delimiter), "invalid delimiter character");

        this.delimiter = delimiter;
    }

    public clone(): Name {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    public asString(delimiter: string = this.delimiter): string {
        let noComponents: number = this.getNoComponents();
        let outputComponents: string[] = [];

        for(let idx_component = 0; idx_component < noComponents; idx_component++){
            let component: string = this.getComponent(idx_component);
            let outputComponent: string = "";
            for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
                if(component[idx_letter]===ESCAPE_CHARACTER){
                    //Skip first appearance of escape character
                    idx_letter += 1;
                    if(idx_letter < component.length)outputComponent += component[idx_letter]
                }
                else outputComponent += component[idx_letter]
            }
            outputComponents.push(outputComponent);
        }
    
        return outputComponents.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let noComponents: number = this.getNoComponents();
        let outputComponents: string[] = [];

        for(let idx_component = 0; idx_component < noComponents; idx_component++){
            outputComponents.push(this.getComponent(idx_component))
        }
        return outputComponents.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        return this.asDataString() === other.asDataString()
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i: number = 0; i < s.length; i++) {
            let c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        this.append(other.asDataString());
    }


    protected isValidIndex(i: number): boolean{
        return i < this.getNoComponents();
    }

    protected isValidDelimiterLength(delimiter: string):boolean{
        return delimiter.length === 1
    }

    protected isValidDelimiter(delimiter: string):boolean{
        return delimiter !== ESCAPE_CHARACTER
    }

}