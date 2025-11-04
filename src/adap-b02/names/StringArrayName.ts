import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if(delimiter) this.delimiter = delimiter;
        
        for(let idx_component in source){
            let component: string = source[idx_component];
            let currentComponent: string = "";
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
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let outputComponents: string[] = [];
        for(let idx_component in this.components){
            let component: string = this.components[idx_component];
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

    public asDataString(): string {
        return this.components.join(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        let addComponents: string[] = [];
        let component: string = c;
        let currentComponent: string = "";
        for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
            if(component[idx_letter]==this.delimiter){
                addComponents = addComponents.concat(currentComponent);
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
        addComponents = addComponents.concat(currentComponent);
        this.components.splice(i, 1, ...addComponents);
    }

    public insert(i: number, c: string): void {
        let addComponents: string[] = [];
        let component: string = c;
        let currentComponent: string = "";
        for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
            if(component[idx_letter]==this.delimiter){
                addComponents = addComponents.concat(currentComponent);
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
        addComponents = addComponents.concat(currentComponent);
        this.components.splice(i, 0, ...addComponents);
    }

    public append(c: string): void {
        let addComponents: string[] = [];
        let component: string = c;
        let currentComponent: string = "";
        for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
            if(component[idx_letter]==this.delimiter){
                addComponents = addComponents.concat(currentComponent);
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
        addComponents = addComponents.concat(currentComponent);
        this.components.push(...addComponents);
    }

    public remove(i: number): void {
        this.components.splice(i,1);
    }

    public concat(other: Name): void {
        this.append(other.asDataString())
    }

} 