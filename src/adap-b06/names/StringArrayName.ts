import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string, empty?: boolean) {
        super(delimiter);

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
    //TODO 
    public clone(): Name {
        let clone: StringArrayName = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        clone.components = [...this.components];
        
        return clone;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(this.isValidIndex(i), "index out of bounds");
        const component: string = this.components[i];
        MethodFailedException.assert(this.isValidComponent(component));
        return component;
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidIndex(i), "index out of bounds");
        IllegalArgumentException.assert(this.isValidComponent(c), "Component was not properly masked");

        const oldNoComponents = this.getNoComponents();
        let components = [...this.components];
        components[i] = c

        MethodFailedException.assert(components[i] === c, "Component was not saved");
        MethodFailedException.assert(oldNoComponents === components.length, "Component number has changed");

        return new StringArrayName(components, this.getDelimiterCharacter())
        
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidInsertIndex(i), "index out of bounds");
        IllegalArgumentException.assert(this.isValidComponent(c), "Component was not properly masked");

        const oldNoComponents = this.getNoComponents();
        let components = [...this.components];
        components.splice(i, 0, c);

        MethodFailedException.assert(components[i] === c, "Component was not saved");
        MethodFailedException.assert(oldNoComponents + 1 === components.length, "Component number is not oldNoComponents + 1");

        return new StringArrayName(components, this.getDelimiterCharacter());
    }

    public append(c: string): Name {
        IllegalArgumentException.assert(this.isValidComponent(c), "Component was not properly masked");

        const oldNoComponents = this.getNoComponents();
        let components = [...this.components];
        components.push(c);

        MethodFailedException.assert(components[oldNoComponents] === c, "Component was not saved");
        MethodFailedException.assert(oldNoComponents + 1 === components.length, "Component number is not oldNoComponents + 1");

        return new StringArrayName(components, this.getDelimiterCharacter());
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(this.isValidIndex(i), "index out of bounds");
        const oldNoComponents: number = this.getNoComponents()
        let components = [...this.components];
        components.splice(i,1);
        
        MethodFailedException.assert(components.length === oldNoComponents - 1, "Removing Component Failed")

        return new StringArrayName(components, this.getDelimiterCharacter(), components.length === 0);
    }
}