import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        
        this.name = source;

        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    /*public clone(): Name {
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }
/*
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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if (this.isEmpty()){
           let emptyComponent: string[] = [];
            return emptyComponent[i];
        }
        let components: string[] = this.splitComponents();
        return components[i];
    
    }

    public setComponent(i: number, c: string) {
        let components: string[] = [];
        if (!this.isEmpty()){
            components= this.splitComponents();
        }
        components[i] = c;

        this.name = components.join(this.delimiter);
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public insert(i: number, c: string) {
        let components: string[] = [];
        if (!this.isEmpty()){
            components= this.splitComponents();
        }
   
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public append(c: string) {
        if (this.isEmpty()){
            this.name = c
        }
        else{
            this.name = this.name + this.delimiter + c;
        }
        
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    public remove(i: number) {
        let components: string[] = this.splitComponents();

        components.splice(i,1);
        console.log(components);
        
        this.name = components.join(this.delimiter);
        if(components.length === 0){
            this.noComponents = 0;
            return;
        }
        let newcomponents: string[] = this.splitComponents();
        this.noComponents = newcomponents.length;
    }

    /*public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }*/

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