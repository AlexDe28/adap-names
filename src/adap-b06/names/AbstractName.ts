import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Exception } from "../common/Exception";

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
        IllegalArgumentException.assert(!this.isEmpty(), "Cannot display empty Name");
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
        IllegalArgumentException.assert(!this.isEmpty(), "Cannot display empty Name");
        let noComponents: number = this.getNoComponents();
        let outputComponents: string[] = [];

        for(let idx_component = 0; idx_component < noComponents; idx_component++){
            outputComponents.push(this.getComponent(idx_component))
        }
        return outputComponents.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        if (this.isEmpty() && other.isEmpty()) return true;
        if (this.isEmpty() || other.isEmpty()) return false;
        return this.asDataString() === other.asDataString()
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        if (this.isEmpty()) return hashCode;
        
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
    abstract setComponent(i: number, c: string): Name;

    abstract insert(i: number, c: string): Name;
    abstract append(c: string): Name;
    abstract remove(i: number): Name;

    public concat(other: Name): Name {
        this.append(other.asDataString());
        throw new Error("Not Implemented");
    }

    protected isValidIndex(i: number): boolean{
        return i < this.getNoComponents();
    }

    protected isValidInsertIndex(i: number): boolean{
        return i <= this.getNoComponents();
    }

    protected isValidDelimiterLength(delimiter: string):boolean{
        return delimiter.length === 1
    }

    protected isValidDelimiter(delimiter: string):boolean{
        return delimiter !== ESCAPE_CHARACTER
    }

    protected isValidComponent(component: string):boolean{
        if(component == null) return false;
        let addComponents: string[] = [];
        let currentComponent: string = "";
        for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
            if(component[idx_letter]==this.delimiter){
                addComponents = addComponents.concat(currentComponent);
                currentComponent = "";
            }
            else if(component[idx_letter]===ESCAPE_CHARACTER){
                if(((idx_letter+1) < component.length) && 
                    (component[idx_letter+1]==this.delimiter || 
                    component[idx_letter+1]==ESCAPE_CHARACTER)){
                    //Delimiter is to be escaped
                    currentComponent += component[idx_letter] + component[idx_letter+1];
                    idx_letter += 1;
                }
                else currentComponent += component[idx_letter];
            }
            else currentComponent += component[idx_letter];
        }
        addComponents = addComponents.concat(currentComponent);
        if (addComponents.length > 1) return false;
        return true;
    }
    

}