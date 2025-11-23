import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        //if(delimiter) super(delimiter);
        //else super();

        for(let idx_component in source){
            let component: string = source[idx_component];
            let currentComponent: string = "";
            for(let idx_letter = 0; idx_letter < component.length; idx_letter++){
                if(component[idx_letter]==this.delimiter){
                    this.components = this.components.concat(currentComponent);
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
            this.components = this.components.concat(currentComponent);
        }
    }

    /*public clone(): Name {
        throw new Error("needs implementation or deletion");
    }

    /*public asString(delimiter: string = this.delimiter): string {
        
    }

    public asDataString(): string {
        throw new Error("needs implementation or deletion");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation or deletion");
    }

    public getHashCode(): number {
        throw new Error("needs implementation or deletion");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }*/

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        let addComponents: string[] = [];
        let component: string = c;
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
        this.components.splice(i, 1, ...addComponents);
    }

    public insert(i: number, c: string) {
        let addComponents: string[] = [];
        let component: string = c;
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
        this.components.splice(i, 0, ...addComponents);
    }

    public append(c: string) {
        let addComponents: string[] = [];
        let component: string = c;
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
        this.components.push(...addComponents);
    }

    public remove(i: number) {
        this.components.splice(i,1);
        console.log(this.components);
    }

    /*
    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }*/
}