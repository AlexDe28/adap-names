import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string, empty?: boolean) {
        super(delimiter);
        
        if(empty != undefined && empty === true){
            IllegalArgumentException.assert(source === "", "Empty was true, but source != \"\"")
            this.name = source;

            this.noComponents = 0;
        }
        else{
            this.name = source;

            let newcomponents: string[] = this.splitComponents();
            this.noComponents = newcomponents.length;
        }
    }
    
    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(this.isValidIndex(i), "index out of bounds");
        if (this.isEmpty()){
           let emptyComponent: string[] = [];
            return emptyComponent[i];
        }
        let components: string[] = this.splitComponents();
        const component: string = components[i];
        MethodFailedException.assert(this.isValidComponent(component));
        return components[i];
    }

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidIndex(i), "index out of bounds");
        IllegalArgumentException.assert(this.isValidComponent(c), "Component was not properly masked");
        const oldNoComponents = this.getNoComponents();
        let components: string[] = [];
        if (!this.isEmpty()){
            components= this.splitComponents();
        }
        
        components[i] = c;

        let name = components.join(this.delimiter);
        let returnname: StringName = new StringName(name, this.getDelimiterCharacter());

        MethodFailedException.assert(returnname.getComponent(i) === c, "Component was not saved");
        MethodFailedException.assert(returnname.getNoComponents() === oldNoComponents, "Component number has changed");
        return returnname

    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(this.isValidInsertIndex(i), "index out of bounds");
        IllegalArgumentException.assert(this.isValidComponent(c), "Component was not properly masked");
        const oldNoComponents = this.getNoComponents();
        let components: string[] = [];
        if (!this.isEmpty()){
            components= this.splitComponents();
        }
   
        components.splice(i, 0, c);

        let name = components.join(this.delimiter);
        let returnname: StringName = new StringName(name, this.getDelimiterCharacter());

        MethodFailedException.assert(returnname.getComponent(i) === c, "Component was not saved");
        MethodFailedException.assert(returnname.getNoComponents() === oldNoComponents + 1, "Component number is not oldNoComponents + 1");
        return returnname
    }

    public append(c: string): Name {
        IllegalArgumentException.assert(this.isValidComponent(c), "Component was not properly masked");
        const oldNoComponents = this.getNoComponents();
        let name = "";
        if (this.isEmpty()){
            name = c
        }
        else{
            name = this.name + this.delimiter + c;
        }
        let returnname: StringName = new StringName(name, this.getDelimiterCharacter());

        MethodFailedException.assert(returnname.getComponent(oldNoComponents) === c, "Component was not saved");
        MethodFailedException.assert(returnname.getNoComponents() === oldNoComponents + 1, "Component number is not oldNoComponents + 1");

        return returnname;
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(this.isValidIndex(i), "index out of bounds");
        let components: string[] = this.splitComponents();
        const oldNoComponents: number = this.getNoComponents()

        components.splice(i,1);
        
        let name = components.join(this.delimiter);
        let returnname: StringName = new StringName(name, this.getDelimiterCharacter(), components.length === 0);
        
        MethodFailedException.assert(returnname.getNoComponents() === oldNoComponents - 1, "Removing Component Failed");

        return returnname;
    }

    private splitComponents(): string[]{
        let components: string[] = [];
        
        let currentComponent: string = "";
        for(let idx_letter = 0; idx_letter < this.name.length; idx_letter++){
            
            if(this.name[idx_letter]==this.delimiter){
                components = components.concat(currentComponent);
                currentComponent = "";
            }
            else if(this.name[idx_letter]===ESCAPE_CHARACTER){
                if(((idx_letter+1) < this.name.length) && 
                    (this.name[idx_letter+1]==this.delimiter || 
                    this.name[idx_letter+1]==ESCAPE_CHARACTER)){
                    //Delimiter is to be escaped
                    currentComponent += this.name[idx_letter] + this.name[idx_letter+1];
                    idx_letter += 1;
                }
                else currentComponent += this.name[idx_letter];
            }
            else currentComponent += this.name[idx_letter];
        }
        components = components.concat(currentComponent);
        return components;
        
    }

}