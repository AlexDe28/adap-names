import { a } from "vitest/dist/chunks/suite.d.FvehnV49";

export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];
    //TODO Name Functions and Test Switching delimiters
    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        if(delimiter) this.delimiter = delimiter;
        let currentComponent: string = "";
        let escaped: boolean = false;

        for(let idx_component in other){
            let component: string = other[idx_component];
            for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
                if(component[idx_letter]==this.delimiter){
                    this.components = this.components.concat(currentComponent);
                    currentComponent = "";
                }
                else if(component[idx_letter]===ESCAPE_CHARACTER){
                    if(((idx_letter+1) < component.length) && component[idx_letter+1]==this.delimiter){
                        //Delimiter is to be escaped
                        currentComponent += component[idx_letter] + component[idx_letter+1];
                        idx_letter += 1;
                    }
                    else currentComponent += component[idx_letter];
                }
                else currentComponent += component[idx_letter];


            }
            this.components = this.components.concat(currentComponent);
            currentComponent = "";
        }
    }

    /**
     * Returns a human-readable representation of the Name instance using user-set special characters
     * Special characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        let outputComponents: string[] = [];
        for(let idx_component in this.components){
            outputComponents.push(this.components[idx_component].replaceAll('\\'+this.delimiter, this.delimiter))
        }
        return outputComponents.join(delimiter);
    }

    /** 
     * Returns a machine-readable representation of Name instance using default special characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The special characters in the data string are the default characters
     */
    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    /** Returns properly masked component string */
    public getComponent(i: number): string {
        return this.components[i];
    }

    /** Expects that new Name component c is properly masked */
    public setComponent(i: number, c: string): void {
        this.components[i] = c;
    }

     /** Returns number of components in Name instance */
     public getNoComponents(): number {
        return this.components.length;
    }

    /** Expects that new Name component c is properly masked */
    public insert(i: number, c: string): void {
        //TODO
        this.components.splice(i, 0, c);
    }

    /** Expects that new Name component c is properly masked */
    public append(c: string): void {
        //TODO
        this.components.push(c);
    }

    public remove(i: number): void {
        this.components.splice(i,1);
    }

}
